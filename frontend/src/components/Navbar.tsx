import LogoComponent from './navbar/LogoComponent';
import NavigationLinks from './navbar/NavigationLinks';
import CartWidget from './navbar/CartWidget';
import AuthControls from './navbar/AuthControls';

function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <LogoComponent />
          </div>
          <NavigationLinks />
          <div className="flex items-center space-x-4">
            <CartWidget />
            <AuthControls />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
