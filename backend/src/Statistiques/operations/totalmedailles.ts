import { MongoConnection } from '../../db/call';
import { ObjectId } from 'mongodb';

export async function TotalMedailles(type: string, id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");

    const validType = type === 'athlete' || type === 'country' || type === 'jeux' ? type : null;

    if (!validType) {
        throw new Error('Invalid type. Type must be either "athlete" or "country".');
    }

    if (validType === 'athlete') {
        const athleteId = new ObjectId(id);
        const result = await medailles.aggregate([
            { $match: { AthleteID: athleteId } },
            {
                $group: {
                    _id: '$AthleteID',
                    totalMedals: { $sum: 1 }
                }
            }
        ]).toArray();
        return result[0]?.totalMedals || 0;
    } else if (validType === 'country') {
        const countryId = new ObjectId(id);
        const result = await medailles.aggregate([
            {
                $lookup: {
                    from: 'athletes',
                    localField: 'AthleteID',
                    foreignField: '_id',
                    as: 'athlete'
                }
            },
            { $unwind: '$athlete' },
            { $match: { 'athlete.PaysID': countryId } },
            {
                $lookup: {
                    from: 'countries',
                    localField: 'athlete.PaysID',
                    foreignField: '_id',
                    as: 'country'
                }
            },
            { $unwind: '$country' },
            {
                $group: {
                    _id: '$country.noc',
                    totalMedals: { $sum: 1 }
                }
            },
            { $sort: { totalMedals: -1 } }
        ]).toArray();
        return result[0]?.totalMedals || 0;
    }
    else if (validType === 'jeux') {
        const jeuxId = new ObjectId(id);
        const result = await medailles.aggregate([
            { $match: { JeuxID: jeuxId } },
            {
                $group: {
                    _id: '$JeuxID',
                    totalMedals: { $sum: 1 }
                }
            }
        ]).toArray();
        return result[0]?.totalMedals || 0;
    }
}

export async function TotalMedaillesByType(type: string, id: string) {
    const client = await MongoConnection();
    const db = client.db("TP-React");
    const medailles = db.collection("medailles");

    const validType = type === 'athlete' || type === 'country' || type === 'jeux' ? type : null;

    if (!validType) {
        throw new Error('Invalid type. Type must be either "athlete" or "country".');
    }

    if (validType === 'athlete') {
        const athleteId = new ObjectId(id);
        const result = await medailles.aggregate([
            { $match: { AthleteID: athleteId } },
            {
                $group: {
                    _id: '$AthleteID',
                    gold: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Gold"] }, 1, 0]
                        }
                    },
                    silver: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Silver"] }, 1, 0]
                        }
                    },
                    bronze: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Bronze"] }, 1, 0]
                        }
                    }
                }
            }
        ]).toArray();
        return result[0] || { gold: 0, silver: 0, bronze: 0 };
    } else if (validType === 'country') {
        const countryId = new ObjectId(id);
        const result = await medailles.aggregate([
            {
            $lookup: {
                from: 'athletes',
                localField: 'AthleteID',
                foreignField: '_id',
                as: 'athlete'
            }
            },
            { $unwind: '$athlete' },
            { $match: { 'athlete.PaysID': countryId } },
            {
            $group: {
                _id: '$athlete.PaysID',
                gold: {
                $sum: {
                    $cond: [{ $eq: ["$NomMedaille", "Gold"] }, 1, 0]
                }
                },
                silver: {
                $sum: {
                    $cond: [{ $eq: ["$NomMedaille", "Silver"] }, 1, 0]
                }
                },
                bronze: {
                $sum: {
                    $cond: [{ $eq: ["$NomMedaille", "Bronze"] }, 1, 0]
                }
                }
            }
            }
        ]).toArray();
        
        return result[0] || { gold: 0, silver: 0, bronze: 0 };
    } else if (validType === 'jeux') {
        const jeuxId = new ObjectId(id);
        const result = await medailles.aggregate([
            { $match: { JeuxID: jeuxId } },
            {
                $group: {
                    _id: '$JeuxID',
                    gold: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Gold"] }, 1, 0]
                        }
                    },
                    silver: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Silver"] }, 1, 0]
                        }
                    },
                    bronze: {
                        $sum: {
                            $cond: [{ $eq: ["$NomMedaille", "Bronze"] }, 1, 0]
                        }
                    }
                }
            }
        ]).toArray();
        return result[0] || { gold: 0, silver: 0, bronze: 0 };
    }
}