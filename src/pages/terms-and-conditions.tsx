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

TermsAndConditions.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title> Terms | Dmerce</title>
      </Head>

      <Container>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Terms and Condition
        </Typography>

        <Box sx={{ pb: 8 }}>
          <Typography variant="h5" sx={{ pt: 2 }}>
            Hello and welcome to Dmerce&apos;s Terms of Service!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ pt: 2 }}>
            These Terms of Service ("Terms") cover your use of and access to the sites, templates,
            products, applications, tools, services and features (collectively, the "Services")
            provided by Dmerce (as defined below), including without limitation during free trials,
            on the websites and associated domains of www.Dmerce.com, www.acuityscheduling.com,
            www.unfold.com and www.bio.site and on Dmerce web, mobile and other applications.
            <br />
            <br />
            Please read this Agreement (as defined below) carefully! IT INCLUDES IMPORTANT
            INFORMATION ABOUT YOUR LEGAL RIGHTS, AND COVERS AREAS SUCH AS AUTOMATIC SUBSCRIPTION
            RENEWALS, WARRANTY DISCLAIMERS, LIMITATIONS OF LIABILITY, THE RESOLUTION OF DISPUTES BY
            ARBITRATION AND A CLASS ACTION WAIVER. Please note if you are an EU Consumer (as defined
            below), some of these provisions may not apply to you and you may be entitled to
            specific rights under the mandatory laws of the country in which you reside.
            <br />
            <br />
            By using or accessing the Services, you're agreeing to these Terms, our Product Specific
            Terms, our Copyright Policy, our Acceptable Use Policy and our Data Processing Addendum
            (collectively, this “Agreement”). If you're using the Services for or on behalf of an
            organization, you're agreeing to this Agreement on behalf of that organization, and you
            represent and warrant that you can do so. References to “you”, “your” and similar terms
            are construed accordingly in this Agreement. If you don’t agree to all the terms in this
            Agreement, you may not use or access the Services.
            <br />
            <br />
            If you are a resident of or have your principal place of business in the United States
            of America or any of its territories or possessions (the “US”), you are agreeing to this
            Agreement with Dmerce, Inc. and are a “US User”. Otherwise, you are agreeing to this
            Agreement with Dmerce Ireland Limited (“Dmerce Ireland”) and are a “Non-US User”.
            References to “Dmerce”, “us”, “we” and “our” mean Dmerce, Inc. if you are a US User or
            Dmerce Ireland if you are a Non-US User. If your place of residence or principal place
            of business changes, the Dmerce entity you contract with will be determined by your new
            residence or principal place of business, as specified above, from the date it changes.
            In addition, certain services may be provided to you by a Dmerce group company other
            than Dmerce, Inc. or Dmerce Ireland and may be subject to additional terms directly
            between you and such other Dmerce group company; such additional terms will specify the
            name of the Dmerce group company and you will contract with such Dmerce group company
            solely with respect to such terms and such service.
            <br />
            <br />
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              1. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creating Accounts
            </Typography>
            <Typography>
              To use many of the Services, you must first create an account (“Account”). Different
              parts of the Services may require different Accounts. You agree to provide us with
              accurate, complete and at all times up to date information for your Accounts. We may
              need to use this information to contact you.
              <br />
              <br />
              Please safeguard your Accounts and make sure others don't have access to your Accounts
              or passwords and other authentication credentials (collectively, "passwords"). You're
              solely responsible for any activity on your Accounts and for maintaining the
              confidentiality and security of your passwords. We’re not liable for any acts or
              omissions by you or anyone else in connection with your Accounts. You must immediately
              notify us if you know or have any reason to suspect that your Accounts or passwords
              have been stolen, misappropriated or otherwise compromised or in case of any actual or
              suspected unauthorized use of your Accounts.
              <br />
              <br />
              The Services are not intended for and may not be used by children under the age of 16.
              By using the Services, you represent that you're at least 16. If you’re under the age
              of 18, depending on where you live, you may need to have your parent or guardian’s
              consent to this Agreement and they may need to enter into this Agreement on your
              behalf.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              2. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Third Party Services And Sites and
              User Content
            </Typography>
            <Typography>
              The Services are integrated with various third party services and applications
              (collectively, “Third Party Services”) that may make their content, products or
              services available to you. Examples of Third Party Services include certain domain
              name registration services, social media platforms, Dmerce Experts (as defined below),
              eCommerce Payment Processors (as defined below), extensions listed on Dmerce
              Extensions (as defined below) and other integrations or extensions, stock images and
              email service subscriptions for sale via the Services and other integration partners
              and service providers. These Third Party Services may have their own terms and
              policies, and your use of them will be governed by those terms and policies. Any
              information that a Third Party Service collects, stores and processes from you or Your
              Sites will be subject to such Third Party Service’s terms of service, privacy notice,
              or similar terms, and will not be subject to our Privacy Policy or Data Processing
              Addendum. Therefore, please evaluate and ensure you trust each Third Party Service
              prior to connecting Your Site to its services. Each Third Party Service is solely
              responsible for providing all support, maintenance and technical assistance to you
              with respect to their services (including their interoperation with Your Sites). When
              using Third Party Services, your security is your responsibility. We don't control
              Third Party Services, and we’re not liable for Third Party Services or for any
              transaction you may enter into with them, or for what they do. We may receive a
              revenue share from Third Party Services that we recommend to you or that you otherwise
              engage via the Services. You agree that we may, at any time and in our sole
              discretion, and without any notice to you, suspend, disable access to or remove any
              Third Party Services. We’re not liable for any such suspension, disabling or removal,
              including without limitation for any loss of profits, revenue, data, goodwill or other
              intangible losses, or business disruption, costs or expenses you may incur or
              otherwise experience as a result (except where prohibited by applicable law).{' '}
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              3. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our Rights
            </Typography>
            <Typography>
              By using the Services, you confirm that you have read and understood our Privacy
              Policy. However, it is not a contractual document and does not form part of this
              Agreement and we may change it from time to time.
              <br />
              <br />
              You agree and warrant that you are solely responsible when using Your Sites or the
              Services for complying with applicable data protection, security and privacy laws and
              regulations (including, where applicable, the EU General Data Protection Regulation
              and the EU e-Privacy Directive/Regulation), including any notice and consent
              requirements. This includes without limitation the collection and processing by you of
              any personal data, when you use Your Sites and the Services to send marketing and
              other electronic communications to individuals and when using cookies and similar
              technologies on Your Sites (including, in particular, those which we place for you at
              your request as part of the Services, such as to undertake analytics for you).
              <br />
              <br />
              You agree that we may protect and improve the Services through analysis of your use of
              the Services and/or your End Users’ use of Your Sites in anonymized, pseudonymized,
              de-personalized and/or aggregated form. If applicable law requires, you must explain
              this in your privacy policy. See our Privacy Policy for more information about how and
              what we do in this regard.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              4. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Copyright
            </Typography>
            <Typography>
              We respect the intellectual property of others and ask that you do too. We respond to
              notices of alleged copyright infringement if they comply with the law, and such
              notices should be reported via the process described in our Copyright Policy, which is
              incorporated by reference into this Agreement. We reserve the right to delete or
              disable content alleged to be infringing, and to terminate Accounts of repeat
              infringers without any refunds.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              5. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Term And Termination
            </Typography>
            <Typography>
              This Agreement will remain in effect until terminated by either you or us. You may
              terminate this Agreement at any time via the Services. We reserve the right to change,
              suspend or discontinue, or terminate, restrict or disable your use of or access to,
              parts or all of the Services or their functionality at any time at our sole discretion
              and without notice. For example, we may suspend or terminate your use of part or all
              of the Services if you violate these Terms or our Acceptable Use Policy. We will
              endeavor to provide you reasonable notice upon suspending or terminating part or all
              of the Services. All sections of this Agreement that by their nature should survive
              termination shall survive termination, including without limitation the following
              sections in these Terms and any similar sections or provisions in the rest of this
              Agreement: Your Content, Our Intellectual Property, Warranty Disclaimers, Limitation
              of Liability, Indemnification, Dispute Resolution and Additional Terms.
            </Typography>
            <Typography variant="h6" sx={{ pt: 3 }} color="textPrimary">
              6. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Additional Terms
            </Typography>
            <Typography>
              This Agreement constitutes the entire agreement between you and Dmerce regarding the
              subject matter of this Agreement, and supersedes and replaces any other prior or
              contemporaneous agreements, or terms and conditions applicable to the subject matter
              of this Agreement. You agree that you have not relied upon, and have no remedies in
              respect of, any term, condition, statement, warranty or representation except those
              expressly set out in this Agreement. You also may be subject to additional terms,
              policies or agreements that may apply when you use other services, including Third
              Party Services. This Agreement creates no third party beneficiary rights, and no third
              party shall have any right or standing to claim benefit or bring an action to enforce
              this Agreement (except otherwise agreed upon in additional terms between you and a
              Dmerce group company that sets forth such Dmerce group company’s third party
              beneficiary rights to enforce this Agreement).
              <br />
              <br />. We are not in breach of this Agreement or liable to you if there is any total
              or partial failure of performance of the Services resulting from any act,
              circumstance, event or matter beyond our reasonable control. This may include where
              such results from any act of God, fire, act of government or state or regulation, war,
              civil commotion, terrorism, pandemic, insurrection, inability to communicate with
              third parties for whatever reason, failure of any computer dealing or necessary
              system, failure or delay in transmission of communications, failure of any internet
              service provider, strike, industrial action or lock-out or any other reason beyond our
              reasonable control.
              <br />
              <br />
              This Agreement was originally written in English. We may translate this Agreement into
              other languages. In the event of a conflict between a translated version and the
              English version, the English version will control except where prohibited by
              applicable law.
            </Typography>
          </Typography>
        </Box>
      </Container>
    </>
  );
}
