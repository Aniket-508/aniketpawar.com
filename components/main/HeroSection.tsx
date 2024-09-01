"use client";

import Section from "../layout/Section";
import Button from "../ui/Button";
import LinkText from "../ui/LinkText";
import Title from "../ui/Title";
import Callout from "./Callout";
import Header from "./Header";

const HeroSection: React.FunctionComponent = () => {
  return (
    <main id="hero">
      <Header />
      <Section>
        <Title>{"about me."}</Title>
        <div className="leading-6 text-sm font-normal text-zinc-500 mt-4">
          <p>
            {`Hey there! I’m a software engineer who’s really into new tech and creating user experiences that make people go "WwOOOwW". I love diving deep into complex problems and sharing what I learn. I’m all about taking charge of the nitty-gritty details and being involved in every step of the way, from the first idea to the final product.`}
          </p>
        </div>
        <Callout className="mt-4">
          <p>
            {
              "I am currently open for full-time engineering roles, which involves developing beautiful user interfaces as well as complex backend logic to handle entire product flow."
            }
          </p>
          <p className="mt-2 mb-4">
            {"Interested in working together? Feel free to schedule a meet!"}
          </p>
          <div className="flex flex-row items-center justify-start gap-4">
            <Button onClick={() => window.open("https://cal.com/aniket-pawar")}>
              {"Schedule a meet / cal.com"}
            </Button>
            <LinkText
              href={"/resume.pdf"}
              className="text-zinc-600 font-medium text-sm"
            >
              {"Resume"}
            </LinkText>
          </div>
        </Callout>
      </Section>
    </main>
  );
};

export default HeroSection;
