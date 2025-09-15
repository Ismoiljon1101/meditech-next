import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="icon" type="image/png" href="/img/logo/favicon.svg" />

				{/* SEO */}
				<meta
					name="keywords"
					content="meditech, medical equipment, buy medical tools, sell medical instruments, rent medical devices, barter medical equipment"
				/>
				<meta
					name="description"
					content={
						'Buy, sell, rent, or barter medical tools and equipment safely and conveniently. ' +
						'Meditech is your trusted platform for new, used, and professional medical devices. | ' +
						'Медтех – безопасная платформа для покупки, продажи, аренды и обмена медицинских инструментов и оборудования. | ' +
						'메디테크 – 안전하게 의료 도구 및 장비를 사고, 팔고, 대여하거나 교환할 수 있는 신뢰 플랫폼입니다.'
					}
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
