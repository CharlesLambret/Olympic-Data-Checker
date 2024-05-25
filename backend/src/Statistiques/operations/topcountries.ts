import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';

interface MedalCount {
  country: string;
  totalMedals: number;
}

export async function getTopCountries(numCountries: number, year?: number, season?: string, medalType?: string): Promise<MedalCount[]> {
  const client = await MongoConnection();
  const db = client.db("TP-React");
  const medailles = db.collection("medailles");
  const jeux = db.collection('jeux');
  const evenements = db.collection('evenements');
  const athletesCollection = db.collection('athletes');
  const countriesCollection = db.collection('countries');

  try {
    const jeu = await jeux.findOne({ Annee: year, Saison: season });
    if (!jeu) {
      throw new Error('No game found with the provided year and season');
    }

    const searchevenements = await evenements.find({ JeuxID: jeu._id }).toArray();
    const eventsIDs = searchevenements.map((event: { _id: any; }) => event._id);
    if (eventsIDs.length === 0) {
      throw new Error('No events found for the provided game');
    }

    const medalFilter: any = { EventID: { $in: eventsIDs } };
    if (medalType) {
      medalFilter.NomMedaille = medalType;
    }
    const medals = await medailles.find(medalFilter).toArray();
    const athleteIds = medals.map(medal => medal.AthleteID);

    if (medals.length === 0) {
      throw new Error('No medals found for the provided events');
    }

    const athletes = await athletesCollection.find({ _id: { $in: athleteIds } }).toArray();
    const countryIds = athletes.map(athlete => athlete.PaysID);
    if (athletes.length === 0) {
      throw new Error('No athletes found for the provided medals');
    }

    const countryCounts = medals.reduce((acc: any, medal) => {
      const athlete = athletes.find(a => a._id.equals(medal.AthleteID));
      if (!athlete) return acc;

      const countryId = athlete.PaysID.toHexString();
      if (!acc[countryId]) acc[countryId] = 0;
      acc[countryId] += 1;

      return acc;
    }, {});

    const countryDocs = await countriesCollection.find({ _id: { $in: Object.keys(countryCounts).map(id => new ObjectId(id)) } }).toArray();
    const topCountries = countryDocs.map(country => ({
      country: country.region,
      totalMedals: countryCounts[country._id.toHexString()]
    })).sort((a, b) => b.totalMedals - a.totalMedals).slice(0, numCountries);

    return topCountries;

  } finally {
    await client.close();
  }
}
