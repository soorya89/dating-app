import { useEffect, useRef, useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import logo from '../../assets/images/logo1.avif';

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, token } = useContext(authContext);
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleStickyHeader = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky__header');
    } else {
      headerRef.current.classList.remove('sticky__header');
    }
  };
console.log(token);
  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: { user: null, token: null },
    });
    navigate('/login');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyHeader);
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  return (
    <header className="header flex items-center px-6 lg:px-8 py-10 bg-primaryColor" ref={headerRef}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className='text-white'>
          <Link to="/">
            <img src={logo} className="w-[50px]" alt="Logo" />
          </Link>
        </div>

        <div className="navigation hidden md:flex items-center gap-6" ref={menuRef} onClick={toggleMenu}>
          <ul className="menu flex items-center gap-[2.7rem]">
            {/* <li>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
            </li> */}
            {/* Add more navigation links here */}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {token && user ? (
            <div className="flex items-center">
              <Link to="/profile/me" className="flex items-center">
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer overflow-hidden">
                  <img className="w-full h-full object-cover" src={user?.profilePic} alt={user?.name} />
                </figure>
                <h1 className="text-textColor text-[16px] font-bold ml-2">{user?.name}</h1>
              </Link>
              <h1 onClick={handleLogout} className="text-white text-[16px] font-bold ml-2 cursor-pointer">
                Logout
              </h1>
            </div>
          ) : (
            <Link to="/login">
              <p className="text-white font-[600]">Login</p>
            </Link>
          )}
          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-6 h-6 cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
