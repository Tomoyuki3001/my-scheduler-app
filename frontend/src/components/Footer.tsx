export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-100 text-center p-4 text-sm text-gray-500 bottom-0 w-full">
      © {currentYear} TimeFlow
    </footer>
  );
}
