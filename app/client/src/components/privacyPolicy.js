import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

class PrivacyPolicy extends Component {
	
	render() {
		const { open, onClose } = this.props;

		return (
			<div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Privacy Policy</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Welcome to our Privacy Policy
              -- Your privacy is critically important to us.
              Cookable.com is located at:

              Cookable.com, 4151234567
            </DialogContentText>
            <DialogContentText>
              It is Cookable.com's policy to respect your privacy regarding any information we may collect 
              while operating our website. This Privacy Policy applies to https://www.cookable.com 
              (hereinafter, "us", "we", or "https://www.cookable.com"). We respect your privacy and 
              are committed to protecting personally identifiable information you may provide us through 
              the Website. We have adopted this privacy policy ("Privacy Policy") to explain what information 
              may be collected on our Website, how we use this information, and under what circumstances we may 
              disclose the information to third parties. This Privacy Policy applies only to information we 
              collect through the Website and does not apply to our collection of information from other sources.
              This Privacy Policy, together with the Terms and conditions posted on our Website, set forth the 
              general rules and policies governing your use of our Website. Depending on your activities when 
              visiting our Website, you may be required to agree to additional terms and conditions.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Website Visitors
              </Typography>
              Like most website operators, Cookable.com collects non-personally-identifying information of 
              the sort that web browsers and servers typically make available, such as the browser type, 
              language preference, referring site, and the date and time of each visitor request. Cookable.com's 
              purpose in collecting non-personally identifying information is to better understand how Cookable.com's 
              visitors use its website. From time to time, Cookable.com may release non-personally-identifying 
              information in the aggregate, e.g., by publishing a report on trends in the usage of its website.
              Cookable.com also collects potentially personally-identifying information like Internet Protocol 
              (IP) addresses for logged in users and for users leaving comments on https://www.cookable.com blog posts. 
              Cookable.com only discloses logged in user and commenter IP addresses under the same circumstances that 
              it uses and discloses personally-identifying information as described below.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Gathering of Personally-Identifying Information
              </Typography>
              Certain visitors to Cookable.com's websites choose to interact with Cookable.com in ways that 
              require Cookable.com to gather personally-identifying information. The amount and type of 
              information that Cookable.com gathers depends on the nature of the interaction. For example, we 
              ask visitors who sign up for a blog at https://www.cookable.com to provide a username and email 
              address.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Security
              </Typography>
              The security of your Personal Information is important to us, but remember that no method of 
              transmission over the Internet, or method of electronic storage is 100% secure. While we strive 
              to use commercially acceptable means to protect your Personal Information, we cannot guarantee 
              its absolute security.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Advertisements
              </Typography>
              Ads appearing on our website may be delivered to users by advertising partners, who may set cookies. 
              These cookies allow the ad server to recognize your computer each time they send you an online 
              advertisement to compile information about you or others who use your computer. This information 
              allows ad networks to, among other things, deliver targeted advertisements that they believe will be 
              of most interest to you. This Privacy Policy covers the use of cookies by Cookable.com and does not 
              cover the use of cookies by any advertisers.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Links To External Sites
              </Typography>
              Our Service may contain links to external sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy and terms and conditions of every site you visit.
              We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites, products or services.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Aggregated Statistics
              </Typography>
              Cookable.com may collect statistics about the behavior of visitors to its website. Cookable.com may display this information publicly or provide it to others. However, Cookable.com does not disclose your personally-identifying information.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Cookies
              </Typography>
              To enrich and perfect your online experience, Cookable.com uses "Cookies", similar technologies and services provided by others to display personalized content, appropriate advertising and store your preferences on your computer.
              A cookie is a string of information that a website stores on a visitor's computer, and that the visitor's browser provides to the website each time the visitor returns. Cookable.com uses cookies to help Cookable.com identify and track visitors, their usage of https://www.cookable.com, and their website access preferences. Cookable.com visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Cookable.com's websites, with the drawback that certain features of Cookable.com's websites may not function properly without the aid of cookies.
              By continuing to navigate our website without changing your cookie settings, you hereby acknowledge and agree to Cookable.com's use of cookies.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                Privacy Policy Changes
              </Typography>
              Although most changes are likely to be minor, Cookable.com may change its Privacy Policy from time to time, and in Cookable.com's sole discretion. Cookable.com encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
            </DialogContentText>
            <DialogContentText>
              <Typography variant='h6'>
                - Credit & Contact Information
              </Typography>
              This privacy policy was created at https://termsandconditionstemplate.com/privacy-policy-generator/. If you have any questions about this Privacy Policy, please contact us via or phone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
		);
	}
}

export default PrivacyPolicy;