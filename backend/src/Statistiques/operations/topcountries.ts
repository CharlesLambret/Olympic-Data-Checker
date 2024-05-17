import { MongoConnection } from '../../db/call';

export async function getTopCountries(numCountries: number, year?: number, season?: string, medalType?: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");    
    const medailles = db.collection("medailles");
    const jeux = db.collection('jeux');
    const countries = db.collection('countries');

    try {     
      const matchStage: any = {};
  
      if (year) {
        const recherchejeux = await jeux.findOne({ Annee: year, Saison: season });
        if (recherchejeux) {
          matchStage['EventID'] = recherchejeux._id;
        } else {
          throw new Error(`No Olympic games found for year ${year} and season ${season}`);
        }
      }
  
      if (medalType && medalType !== 'all') {
        matchStage['NomMedaille'] = medalType;
      }
  
      const pipeline = [
        { $match: matchStage },
        {
          $lookup: {
            from: 'countries',
            localField: 'noc',
            foreignField: 'noc',
            as: 'country_info',
          },
        },
        { $unwind: '$country_info' },
        {
          $group: {
            _id: '$country_info.region',
            totalMedals: { $sum: 1 },
          },
        },
        { $sort: { totalMedals: -1 } },
        { $limit: numCountries },
      ];

      const results = await medailles.aggregate(pipeline).toArray();
      return results.map(result => ({
        country: result._id,
        totalMedals: result.totalMedals,
      }));
    } finally {
      await client.close();
    }
  }