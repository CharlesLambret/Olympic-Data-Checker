import React from 'react';
import { CardsStats } from '../components/CardStats';
import { TableMedals } from '../components/TableMedals';
import NavBar from '@/app/components/NavBar';

const Stats: React.FC = () => {
    return (
        <div className='mx-5'>
            <NavBar/>
            <CardsStats/>
            <TableMedals/>
        </div>
    );
};

export default Stats;