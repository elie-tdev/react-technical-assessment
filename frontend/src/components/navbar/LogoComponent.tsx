import { Link } from 'react-router-dom';

/**
 * Component that displays the marketplace logo and links to the home page
 */
export default function LogoComponent() {
  return (
    <Link to="/" className="text-xl font-semibold">
      Marketplace
    </Link>
  );
}