// footercomponents.jsx
function FooterComponents() {
    const items = [
        {
            name: "Github",
            link: "https://github.com/Siddharthaaa21",
            details: "© 2024",
            imgsrc: "/assets/github.png",
        },
        {
            name: "LinkedIn",
            link: "https://linkedin.com/in/siddharthaaa21",
            imgsrc: "/assets/linkedin.png",
        },
        {
            name: "Contact",
            link: "mailto:siddharthaaarora@gmail.com",
            details: "Contact Me",
            imgsrc: "/assets/contact.png",
        },
        {
            link:"https://sidddharthaaa21.netlify.app/",
            details:"Portfolio",
            imgsrc:"/assets/portfolio.png"
        }
    ];

    return (
        <div className="text-2xl text-gray-500">
            <div className="flex justify-center items-center space-x-6 ">
                {items.map((item, index) => (
                    <a href={item.link} key={index} target="_blank" rel="noreferrer" className="flex items-center space-x-2">
                        <img src={item.imgsrc} alt={`${item.name} icon`} width={30} />
                        {/* Conditionally rendering the text details if they exist */}
                        {item.details && <span>{item.details}</span>}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default FooterComponents;
