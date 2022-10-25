import { Link } from 'react-router-dom';

type LogoProps = {
  className?: string;
}

const Logo = ({ className }: LogoProps): JSX.Element => {
  const classes = `${className ? className : ''}  header__logo-link`;

  return (
    <Link className={classes} to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
};

export default Logo;
