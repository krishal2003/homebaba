import { Box } from '@mui/system';
import TournamentsCard from './TournamentsCard';

export const TournamentsCardData = () => (
  <Box
    display="grid"
    gridTemplateColumns={{
      xs: 'repeat(1, 1fr)',
      md: 'repeat(3, 1fr)',
    }}
  >
    <TournamentsCard
      image="https://static.toiimg.com/photo/msid-94867381/94867381.jpg"
      title="Valorant"
      slug="valorant"
      status="Live"
      description=" Valorant is a 5V5 tactical shooter game with unique agents, abilities, and team-based gameplay mechanics."
    />

    <TournamentsCard
      image="https://assets.xboxservices.com/assets/11/21/11214bbe-412c-45b0-b0fb-1d93bd38ec42.jpg?n=FIFA-23_Gallery-0_1350x759_04.jpg"
      title="FIFA 23"
      slug="fifa23"
      status="Upcoming"
      description=" Popular soccer video game series developed by EA Sports with realistic gameplay. Choose your team and start your career now. "
    />
    <TournamentsCard
      image="https://venturebeat.com/wp-content/uploads/2022/12/PUBGM.jpg?fit=1687%2C949&strip=all"
      title="PUBG"
      slug="valorant"
      status="Previous Game"
      description=" Battle royale game with up to 100 players fighting to be the last one standing on an island map. "
    />
    <TournamentsCard
      image="https://cdn1.epicgames.com/offer/e97659b501af4e3981d5430dad170911/EGS_HogwartsLegacy_AvalancheSoftware_S1_2560x1440-2baf3188eb3c1aa248bcc1af6a927b7e"
      title="Hogwarts Legacy"
      status="Live"
      slug="valorant"
      description=" Action RPG set in the Wizarding World allowing players to create their own character and attend Hogwarts School of Wizards."
    />
    <TournamentsCard
      image="https://i.ytimg.com/vi/O8KkJvpz2xc/maxresdefault.jpg"
      title="CSGO"
      slug="valorant"
      status="Upcoming"
      description=" Tactical first-person shooter with bomb defusal, hostage rescue, and team-based gameplay."
    />
  </Box>
);
