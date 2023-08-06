/* eslint-disable react/no-unescaped-entities */
// next
import Head from 'next/head';
// @mui
// layouts
import MainLayout from '../layouts/main';
import { Box, Container } from '@mui/system';
import { Typography } from '@mui/material';
// sections

// ----------------------------------------------------------------------

CookiePolicy.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title> Cookie Policy | Dmerce</title>
      </Head>

      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Cookie Policy
        </Typography>

        <Box sx={{ pb: 8 }}>
          <Typography variant="body1" color="text.secondary" sx={{ pt: 2 }}>
            Dmerce uses cookies, mobile identifiers, tracking URLs, log data and similar
            technologies to help provide, protect, and improve the Dmerce Platform. This Cookie
            Policy (“Policy”) supplements the Dmerce Privacy Policy and explains how and why we use
            these technologies and the choices you have.
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Cookies{' '}
            </Typography>
            <Typography>
              When you visit the Dmerce Platform we may place cookies on your device. Cookies are
              small text files that websites send to your computer or other Internet-connected
              device to uniquely identify your browser or to store information or settings in your
              browser. Cookies allow us to recognize you when you return. They also help us provide
              a customized experience and can enable us to detect certain kinds of fraud. In many
              cases the information we collect using cookies and other tools is only used in a
              non-identifiable manner without reference to personal information. For example, we may
              use information we collect to better understand website traffic patterns and to
              optimize our website experience. In some cases we associate the information we collect
              using cookies and other technology with your personal information. Our business
              partners may also use these tracking technologies on the Dmerce Platform or engage
              others to track your behavior on our behalf.
              <br />
              <br />
              There are two types of cookies used on the Dmerce Platform: (1) “session cookies” and
              (2) “persistent cookies.” Session cookies normally expire when you close your browser,
              while persistent cookies remain on your device after you close your browser, and can
              be used again the next time you access the Dmerce Platform.
              <br />
              <br />
              In many cases you can manage cookie preferences and opt-out of having cookies and
              other data collection technologies used by adjusting the settings on your browser. All
              browsers are different so visit the “help” section of your browser when to learn about
              cookie preferences and other privacy settings that may be available. Please note that
              if you choose to remove or reject cookies or clear local storage this could affect the
              features, availability, and functionality of the Dmerce Platform.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Flash Cookies
            </Typography>
            <Typography>
              We may use Flash Cookies, also known as Local Stored Objects, and similar technologies
              to personalize and enhance your online experience. A Flash cookie is a small data file
              placed on a computer using Adobe Flash technology. The Adobe Flash Player is an
              application that allows rapid development of dynamic content, such as video clips and
              animation.
              <br />
              <br />
              We use Flash cookies to personalize and enhance your online experience and to deliver
              content for Flash players. We may also use Flash cookies for security purposes, to
              gather certain website metrics and to help remember settings and preferences. Flash
              cookies are managed through a different interface than the one provided by your web
              browser
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Pixel Tags, Web Beacons, and Trackers
            </Typography>
            <Typography>
              Pixel tags, web beacons, and tracking urls are tiny graphic images and/or small blocks
              of code placed on website pages, ads, or in our emails that allow us to determine
              whether you performed a specific action. When you access these pages, or when you open
              an email, let us know you have accessed the web page or opened the email. These tools
              help us measure response to our communications and improve our web pages and
              promotions.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Server Logs and Other Technologies
            </Typography>
            <Typography>
              We collect many different types of information from server logs and other
              technologies. For example, we collect information about the device you use to access
              the Dmerce Platform, your operating system type, browser type, domain, and other
              system settings, as well as the language your system uses and the country and time
              zone where your device is located. Our server logs also record the IP address of the
              device you use to connect to the Internet. An IP address is a unique identifier that
              devices require to identify and communicate with each other on the Internet. We may
              also collect information about the website you were visiting before you came to the
              Dmerce Platform and the website you visit after you leave the Dmerce Platform.
              <br />
              <br />
              We may also collect information about your use of the Dmerce Platform such as when we
              provide accessibility tools. The tools described help us improve user experience and
              deliver our services.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Device Information
            </Typography>
            <Typography>
              We may use device-related information to authenticate users. For example, we may use
              your IP address, browser information, or other data provided by your browser or device
              to identify the device being used to access our platform. We may also use these
              device-related techniques for associating you with different devices that you may use
              to access our content including for fraud-protection purposes and to better target
              advertising.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Third Parties
            </Typography>
            <Typography>
              Dmerce permits third parties to collect the information described above through our
              Service and discloses such information to third parties for business purposes as
              described in this Privacy Policy, including but not limited to providing advertising
              on our Service and elsewhere based on users’ online activities over time and across
              different sites, services, and devices.
              <br />
              <br />
              Third parties, including Facebook, place technologies such as pixels and SDKs on the
              Dmerce Platform. These technologies (1) help us analyze how you use the Dmerce
              Platform, such as by noting the third party services from which you arrived, (2)
              market and advertise Dmerce services to you on the Dmerce Platform and third party
              websites, (3) help us detect or prevent fraud or conduct risk assessments, and (4)
              collect information about your activities on the Dmerce Platform, other sites, and/or
              the ads you have clicked on. For example, to help us better understand how people use
              the Dmerce Platform, we work with a number of analytics partners, including Google
              Analytics. To prevent Google Analytics from using your information for analytics, you
              may install the Google Analytics Opt-Out Browser by clicking here. In some cases,
              cookies are placed if certain criteria is met, such as being logged into the third
              party service on the same browser.
              <br />
              <br />
              The Dmerce Platform may use social plugins provided and operated by third parties,
              such as Facebook’s Like Button. As a result of this, you may send to the third party
              the information that you are viewing on a certain part of the Dmerce Platform. If you
              are not logged into your account with the third party, then the third party may not
              know your identity. If you are logged in to your account with the third party, then
              the third party may be able to link information or actions about your interactions
              with the Dmerce Platform to your account with them. Please refer to the third party’s
              privacy policies to learn more about its data practices.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              Your Choice{' '}
            </Typography>
            <Typography>
              Most browsers automatically accept cookies, but you can modify your browser setting to
              decline cookies by visiting the Help portion of your browser’s toolbar. While you may
              disable cookies through your browser settings, the Dmerce Platform currently does not
              respond to a “Do Not Track” signal in the HTTP header from your browser or mobile
              application due to lack of standardization regarding how that signal should be
              interpreted.
              <br />
              <br />
              Your mobile device may allow you to control cookies through its settings function.
              Refer to your device manufacturer’s instructions for more information. If you choose
              to decline cookies, some parts of the Dmerce Platform may not work as intended or may
              not work at all.
            </Typography>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
