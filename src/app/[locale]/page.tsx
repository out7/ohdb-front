import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div className="">
      Главная страница
    </div>
  );
}
