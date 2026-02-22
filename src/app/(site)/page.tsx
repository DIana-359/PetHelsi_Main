import Head from "next/head";
import Appointment from "@/components/Appointment";
import Hero from "@/components/Hero/Hero";
import HeroImage from "@/components/HeroImage";
import Features from "@/components/Features/Features";
import Discount from "@/components/Discount";
import Faq from "@/components/Faq";
import Veterinarians from "@/components/VeterinariansBlock/Veterinarians";
import Footer from "@/components/Footer/Footer";

export default async function Home() {

  return (
    <div>
      <div className="w-full flex flex-col">
        <Head>
          <title>PetHelsi — онлайн сервіс для ваших улюбленців</title>
          <meta
            name="description"
            content="Ветеринари на звʼязку 24/7, швидкий запис та досвідчені фахівці. Дізнайтесь, чому PetHelsi — це правильний вибір для вас і ваших тварин."
          />
          <meta name="robots" content="index, follow" />
          <meta
            property="og:title"
            content="PetHelsi — з турботою про тварин"
          />
          <meta
            property="og:description"
            content="Завжди поруч. Швидкий запис. Кваліфіковані ветеринари. Спробуйте PetHelsi!"
          />
        </Head>
        <Hero />
        <HeroImage />
        <Features />
        <Appointment />
        <Veterinarians />
        <Discount />
        <Faq />
      </div>
      <div className="-mx-4 md:mx-0">
        <Footer />
      </div>
    </div>
  );
}
