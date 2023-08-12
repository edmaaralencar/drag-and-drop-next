import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  invitedByName?: string;
  invitedByEmail?: string;
  projectName?: string;
  signUpLink?: string;
  invitedName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const InvitationEmailTemplate = ({
  invitedByName = "Edmar Alencar",
  invitedByEmail = "edmar@gmail.com",
  projectName = "EVIS",
  signUpLink = `http://localhost:3000/sign-in?invitation=`,
  invitedName = "João Marcos",
}: VercelInviteUserEmailProps) => {
  const previewText = `Join ${invitedByName} on Vercel`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Faça parte do projeto <strong>{projectName}</strong> no{" "}
              <strong>EProject</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Olá {invitedName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{invitedByName}</strong>
              <strong className="text-blue-600"> ({invitedByEmail}) </strong>
              convidou você para o projeto <strong>
                {projectName}
              </strong> no <strong>EProject</strong>.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={signUpLink}
              >
                Entre no projeto
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              ou copie e cole a seguinte URL no browser:{" "}
              <Link href={signUpLink} className="text-blue-600 no-underline">
                {signUpLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default InvitationEmailTemplate;
