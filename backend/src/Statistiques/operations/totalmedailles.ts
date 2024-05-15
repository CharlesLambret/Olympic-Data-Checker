import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';  

export async function TotalMedaillesParPays() {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const athletes = db.collection("athletes");

    athletes.aggregate([
        { $match: { Medaille: { $ne: null } } },
        { $lookup: {
            from: 'countries',
            localField: 'PaysID',
            foreignField: '_id',
            as: 'country'
        }},
        { $unwind: '$country' },
        { $group: {
            _id: '$country.noc',
            totalMedals: { $sum: 1 }
        }},
        { $sort: { totalMedals: -1 } }
    ])

}