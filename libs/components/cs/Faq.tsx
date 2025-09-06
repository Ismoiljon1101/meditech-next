import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('property');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/
	
	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		property: [
    {
      id: '00f5a45ed8897f8090116a01',
      subject: 'Are the medical instruments listed reliable?',
      content: 'Yes. All listings are verified (serial/UDI check, condition grading, decontamination and service documentation) before going live.',
    },
    {
      id: '00f5a45ed8897f8090116a22',
      subject: 'What types of medical instruments do you offer?',
      content: 'We offer surgical tools, diagnostic devices, patient monitors, imaging (ultrasound, X-ray), lab analyzers, dental equipment, rehab/physio devices, consumables, and accessories.',
    },
    {
      id: '00f5a45ed8897f8090116a21',
      subject: 'How can I search for instruments on your website?',
      content: 'Use the search bar to filter by category, brand/model, condition (new/refurbished/used), price range, location, rental term, and certification/warranty.',
    },
    {
      id: '00f5a45ed8897f8090116a23',
      subject: 'Do you provide assistance for first-time equipment buyers?',
      content: 'Yes, we help define requirements, compare options, arrange demos/inspections, and connect you with financing or training where available.',
    },
    {
      id: '00f5a45ed8897f8090116a24',
      subject: 'What should I consider when buying medical equipment?',
      content: 'Intended use, compatibility, condition and hours of use, service history, calibration/warranty, decontamination records, parts availability, power specs, and regulatory compliance.',
    },
    {
      id: '00f5a45ed8897f8090116a25',
      subject: 'How long does the purchasing or rental process typically take?',
      content: 'Typically 2–10 business days domestically, depending on inspection, paperwork, and delivery. International transactions may take longer due to logistics and customs.',
    },
    {
      id: '00f5a45ed8897f8090116a29',
      subject: 'What happens if I encounter issues after purchase or rental?',
      content: 'We offer post-purchase support, DOA/return assistance, and coordination for repair or warranty service as applicable.',
    },
    {
      id: '00f5a45ed8897f8090116a28',
      subject: 'Do you offer instruments in specific regions?',
      content: 'Yes, you can filter inventory by location. We support domestic and select international shipping or pickup.',
    },
    {
      id: '00f5a45ed8897f8090116a27',
      subject: 'Can I sell or list my instruments through your website?',
      content: 'Absolutely. You can list equipment for sale, rent, or barter after completing verification.',
    },
    {
      id: '00f5a45ed8897f8090116b99',
      subject: 'What if I need help understanding legal or regulatory aspects?',
      content: 'We provide general guidance and can recommend regulatory professionals if needed. Buyers and sellers are responsible for complying with local medical-device rules.',
    }
  		],
		payment: [
			{
			id: '00f5a45ed8897f8090116a02',
			subject: 'How can I make the payment?',
			content: 'Pay via our secure portal or through an assigned agent by invoice, bank transfer, credit/debit card, or escrow where supported.',
			},
			{
			id: '00f5a45ed8897f8090116a91',
			subject: 'Are there any additional fees for using your services?',
			content: 'Buyers pay no platform fee. Sellers pay a commission upon successful sale or rental; shipping, customs, inspection, or escrow fees may apply.',
			},
			{
			id: '00f5a45ed8897f8090116a92',
			subject: 'Is there an option for installment payments?',
			content: 'Yes, installments, leasing, or rental plans may be available for eligible orders. Please inquire for terms and qualification.',
			},
			{
			id: '00f5a45ed8897f8090116a93',
			subject: 'Is my payment information secure on your website?',
			content: 'Yes, we use industry-standard encryption and tokenization to protect your payment information.',
			},
			{
			id: '00f5a45ed8897f8090116a94',
			subject: 'Can I make payments online through your website?',
			content: 'Yes, our encrypted payment portal supports deposits, balances, and rental invoices.',
			},
			{
			id: '00f5a45ed8897f8090116a95',
			subject: "What happens if there's an issue with my payment?",
			content: 'Please contact support with your order ID. We will verify and resolve failed, pending, or duplicate transactions.',
			},
			{
			id: '00f5a45ed8897f8090116a96',
			subject: 'Do you offer refunds for payments made?',
			content: 'Refunds depend on order status and return policy. Refer to your invoice terms or contact us for assistance.',
			},
			{
			id: '00f5a45ed8897f8090116a97',
			subject: 'Are there any discounts or incentives for early payments?',
			content: 'We occasionally offer early-payment, bundle, or rental prepay discounts. Check current promotions or ask your agent.',
			},
			{
			id: '00f5a45ed8897f8090116a99',
			subject: 'How long does it take for payments to be processed?',
			content: 'Card payments are typically instant; bank transfers usually clear in 1–3 business days; escrow releases after agreed milestones.',
			},
			{
			id: '00f5a45ed8897f8090116a98',
			subject: 'Are there penalties for late payments?',
			content: 'Late fees may apply per your contract, especially for rentals or leases. Please review your agreement for details.',
			}
		],
		buyers: [
			{
			id: '00f5a45ed8897f8090116a03',
			subject: 'What should buyers pay attention to?',
			content: 'Verify suitability for intended use, device class, condition grade, serial/UDI, service and calibration records, and decontamination status.',
			},
			{
			id: '00f5a45ed8897f8090116a85',
			subject: 'How can I determine if an instrument is within my budget?',
			content: 'Calculate total cost of ownership: price, installation, training, consumables, maintenance, calibration, spares, and warranty. Our agents can help optimize within your budget.',
			},
			{
			id: '00f5a45ed8897f8090116a84',
			subject: 'What documents do I need to provide when purchasing medical equipment?',
			content: 'Typically identification, business/facility details, purchase order, and payment info. Certain devices may require licenses or approvals; we will guide you if additional documents are needed.',
			},
			{
			id: '00f5a45ed8897f8090116a83',
			subject: 'What factors should I consider when choosing a supplier?',
			content: 'Reputation, verified service history, warranty coverage, parts availability, response times, and customer references.',
			},
			{
			id: '00f5a45ed8897f8090116a82',
			subject: 'Can I negotiate the price of an instrument?',
			content: 'Yes. You can negotiate price, included accessories/consumables, installation, training, and service terms. Our agents can assist.',
			},
			{
			id: '00f5a45ed8897f8090116a81',
			subject: 'What are some red flags to watch out for when evaluating instruments?',
			content: 'Missing serial numbers or paperwork, no decontamination proof, inconsistent test results, visible damage, recalled models, and unrealistic pricing.',
			},
			{
			id: '00f5a45ed8897f8090116a80',
			subject: 'Do you provide assistance with equipment inspections?',
			content: 'Yes, we can arrange third-party biomedical inspections, functional tests, and calibration verification before shipment.',
			},
			{
			id: '00f5a45ed8897f8090116a79',
			subject: 'How long does it typically take to find the right instrument?',
			content: 'Timeframes vary by model and budget. Common items may be available immediately; specialty systems can take days to weeks.',
			},
			{
			id: '00f5a45ed8897f8090116a78',
			subject: 'What are the advantages of using your marketplace when buying equipment?',
			content: 'Expert vetting, competitive offers, escrow options, logistics support, and streamlined documentation save you time and reduce risk.',
			},
			{
			id: '00f5a45ed8897f8090116a77',
			subject: 'What happens if I change my mind about an instrument after making an offer?',
			content: 'Depending on the terms and stage of the transaction, you may cancel subject to any stated deposit or restocking fees.',
			}
		],
		agents: [
			{
			id: '00f5a45ed8897f8090116a04',
			subject: 'What do I need to do if I want to become a vendor?',
			content: 'If you decide to become a vendor, review our terms, submit your business details for verification, and contact the admin to onboard your inventory.',
			},
			{
			id: '00f5a45ed8897f8090116a62',
			subject: 'What qualifications do I need to sell medical equipment?',
			content: 'Valid business registration, understanding of medical-device regulations, and ability to provide decontamination and service documentation.',
			},
			{
			id: '00f5a45ed8897f8090116a63',
			subject: 'How do I find clients as a new vendor?',
			content: 'Build your network with clinics and hospitals, use online/offline marketing, product demos, and join a reputable marketplace.',
			},
			{
			id: '00f5a45ed8897f8090116a64',
			subject: 'What are some effective marketing strategies for selling equipment?',
			content: 'High-quality photos, detailed spec sheets, service logs, virtual demos, social media, and targeted outreach.',
			},
			{
			id: '00f5a45ed8897f8090116a65',
			subject: 'How do I handle negotiations with buyers?',
			content: 'Know your costs, be transparent about condition grades, bundle accessories or service, and align on delivery timelines.',
			},
			{
			id: '00f5a45ed8897f8090116a66',
			subject: 'What should I do to stay updated with market trends and changes?',
			content: 'Follow medical-device news, standards updates, and participate in relevant training and industry events.',
			},
			{
			id: '00f5a45ed8897f8090116a67',
			subject: 'How do I handle difficult clients or situations?',
			content: 'Maintain professionalism, clarify requirements, document agreements, and propose evidence-based solutions.',
			},
			{
			id: '00f5a45ed8897f8090116a68',
			subject: 'What tools and technologies should I utilize as a vendor?',
			content: 'CRM and inventory software, listing and analytics tools, virtual tour/video, e-signature, and shipping integrations.',
			},
			{
			id: '00f5a45ed8897f8090116a69',
			subject: 'How do I ensure compliance with medical-device laws and regulations?',
			content: 'Use accurate device classifications, maintain decontamination records, remove any PHI from data-bearing devices, and comply with shipping/safety rules.',
			},
			{
			id: '00f5a45ed8897f8090116a70',
			subject: 'What strategies can I use to grow my medical equipment business?',
			content: 'Deliver reliable gear, secure repeat clients with service contracts, request reviews/referrals, and expand into rentals or barter.',
			}
		],
		membership: [
			{
			id: '00f5a45ed8897f8090116a05',
			subject: 'Do you have a membership service on your site?',
			content: 'Membership service is not available on our site yet.',
			},
			{
			id: '00f5a45ed8897f8090116a60',
			subject: 'What are the benefits of becoming a member on your website?',
			content: 'We currently do not offer membership benefits, but stay tuned for updates on future offerings.',
			},
			{
			id: '00f5a45ed8897f8090116a59',
			subject: 'Is there a fee associated with becoming a member?',
			content: 'As membership services are not available, there are no associated fees at this time.',
			},
			{
			id: '00f5a45ed8897f8090116a58',
			subject: 'Will membership provide access to exclusive content or features?',
			content: "We don't currently have membership-exclusive content or features.",
			},
			{
			id: '00f5a45ed8897f8090116a57',
			subject: 'How can I sign up for a membership on your site?',
			content: 'As of now, we do not have a sign-up process for memberships.',
			},
			{
			id: '00f5a45ed8897f8090116a56',
			subject: 'Do members receive discounts on listings or services?',
			content: 'Membership discounts are not part of our current offerings.',
			},
			{
			id: '00f5a45ed8897f8090116a55',
			subject: 'Are there plans to introduce a membership program in the future?',
			content: "While we can't confirm any plans at this time, we're exploring ways to enhance our services for users.",
			},
			{
			id: '00f5a45ed8897f8090116a54',
			subject: 'What kind of benefits could a future membership include?',
			content: 'Potential benefits may include fee discounts, priority support, or promotional tools for vendors.',
			},
			{
			id: '00f5a45ed8897f8090116a33',
			subject: 'Do you offer a premium membership option?',
			content: 'Currently, we do not provide a premium membership option.',
			},
			{
			id: '00f5a45ed8897f8090116a32',
			subject: 'Will membership grant access to exclusive deals or discounts?',
			content: 'Membership perks, including deals or discounts, are not available at this time.',
			}
		],
		community: [
			{
			id: '00f5a45ed8897f8090116a06',
			subject: 'What should I do if there is abusive or unsafe content in the community section?',
			content: 'If you encounter this situation, please report it immediately or contact the admin.',
			},
			{
			id: '00f5a45ed8897f8090116a44',
			subject: 'How can I participate in the community section of your website?',
			content: 'Create an account and engage in discussions about equipment use, maintenance, and best practices.',
			},
			{
			id: '00f5a45ed8897f8090116a45',
			subject: 'Are there guidelines for posting?',
			content: 'Yes, follow our community guidelines and avoid giving medical or legal advice.',
			},
			{
			id: '00f5a45ed8897f8090116a46',
			subject: 'What should I do if I encounter spam or irrelevant posts?',
			content: 'Report them to the admin.',
			},
			{
			id: '00f5a45ed8897f8090116a47',
			subject: 'Can I connect with other members outside of the community section?',
			content: 'Currently, no.',
			},
			{
			id: '00f5a45ed8897f8090116a48',
			subject: 'Can I share personal experiences or recommendations?',
			content: 'Yes, if relevant you can share experiences and recommendations. Do not include sensitive patient or facility information.',
			},
			{
			id: '00f5a45ed8897f8090116a49',
			subject: 'How can I ensure privacy?',
			content: 'Avoid sharing patient data, device passwords, or confidential facility details.',
			},
			{
			id: '00f5a45ed8897f8090116a50',
			subject: 'How can I contribute positively?',
			content: 'Respect others, stay on topic, and engage constructively with evidence-based insights.',
			},
			{
			id: '00f5a45ed8897f8090116a51',
			subject: 'What if I notice misinformation?',
			content: 'Provide correct information where possible or report it to the admin.',
			},
			{
			id: '00f5a45ed8897f8090116a52',
			subject: 'Are there moderators?',
			content: 'Yes, we have moderators.',
			}
		],
		other: [
			{
			id: '00f5a45ed8897f8090116a40',
			subject: 'Who should I contact if I want to buy your site?',
			content: 'We have no plans to sell the site at this time.',
			},
			{
			id: '00f5a45ed8897f8090116a39',
			subject: 'Can I advertise my services on your website?',
			content: 'We currently do not offer advertising opportunities on our site.',
			},
			{
			id: '00f5a45ed8897f8090116a38',
			subject: 'Are there sponsorship opportunities available on your platform?',
			content: 'At this time, we do not have sponsorship opportunities.',
			},
			{
			id: '00f5a45ed8897f8090116a36',
			subject: 'Can I contribute guest posts or articles to your website?',
			content: "We're not accepting guest posts or articles at the moment.",
			},
			{
			id: '00f5a45ed8897f8090116a35',
			subject: 'Is there a referral program for recommending your website to others?',
			content: "We don't have a referral program in place currently.",
			},
			{
			id: '00f5a45ed8897f8090116a34',
			subject: 'Do you offer affiliate partnerships for promoting your services?',
			content: 'Affiliate partnerships are not available at this time.',
			},
			{
			id: '00f5a45ed8897f8090116a33',
			subject: 'Can I purchase merchandise related to your website?',
			content: "We don't have merchandise available for purchase.",
			},
			{
			id: '00f5a45ed8897f8090116a32',
			subject: 'Are there any job openings or opportunities to work with your team?',
			content: 'Currently, we do not have any job openings or opportunities available.',
			},
			{
			id: '00f5a45ed8897f8090116a31',
			subject: 'Do you host events or webinars related to medical equipment?',
			content: "We're not hosting events or webinars at this time.",
			},
			{
			id: '00f5a45ed8897f8090116a30',
			subject: 'Can I request custom features or functionalities for your website?',
			content: "We're not accepting requests for custom features or functionalities.",
			}
		]
	};

	if (device === 'mobile') {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'property' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('property');
						}}
					>
						Property
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						Foy Buyers
					</div>
					<div
						className={category === 'agents' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('agents');
						}}
					>
						For Agents
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'property' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('property');
						}}
					>
						Property
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						Foy Buyers
					</div>
					<div
						className={category === 'agents' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('agents');
						}}
					>
						For Agents
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
