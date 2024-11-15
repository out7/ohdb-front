'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { createColumns, Deviant } from './columns';

export default function Deviants() {
  const t = useTranslations('Deviations');
  const columns = createColumns(t);

  const [deviants, setDeviants] = useState<Deviant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3035/api/deviants');
        const data: Deviant[] = await response.json();
        setDeviants(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching deviants data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="py-24">
        <div className="container">
          <h1 className="text-3xl font-bold">All Deviants</h1>
          <DataTable columns={columns} data={deviants} />
        </div>
      </section>
    </>
  );
}
