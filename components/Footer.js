function Footer() {
  return (
    <div>
      <div
        className=" text-gray-300 text-center fixed  inset-x-0 bottom-0  p-4 card glass rounded-none"
      >
        <footer className="p-4 space-x-4 justify-center">
          <h3 className="text-xl font-bold">HATARENT</h3>
          <a className="text-sm">Valeriy Zyuba </a>
          <a className="text-sm">|</a>
          <a
            className="cursor-pointer text-sm hover:text-gray-500 hover:scale-105 transform transition duration-300 ease-out"
            href="tel:+38(098)-497-9939"
          >
            +38(098)-497-9939
          </a>
          <a className="text-sm">|</a>
          <a
            className="cursor-pointer text-sm hover:text-gray-500 hover:scale-105 transform transition duration-300 ease-out"
            href="mailto:hatarent@mail.com"
          >
            hatarent@mail.com
          </a>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
