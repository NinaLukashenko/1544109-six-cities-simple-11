import Main from '../../pages/main/main';

type AppProps = {
  placesCount: number;
}

const App = ({placesCount}: AppProps): JSX.Element => <Main placesCount={placesCount}/>;

export default App;
