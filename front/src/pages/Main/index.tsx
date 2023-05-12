import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function Main() {
  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'clip',
        marginTop: '64px',
      }}
    >
      <ImageList
        sx={{
          width: '100%',
          height: 800,
          overflow: 'clip',
        }}
        variant="quilted"
        cols={4}
        rowHeight={131}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}

const itemData = [
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/93/41/72/1000_F_593417204_Xt6vH8RRjQcMI1XejzO2TPzUylXweKy3.jpg',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/89/32/46/1000_F_589324618_tRO8TOLIxqyjv8TgMMENNHL7h3KLFkIO.jpg',
    title: 'Burger',
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/90/96/46/1000_F_590964667_vb6U5w65bsqZACLizyz0KyGOvywwMKAS.jpg',
    title: 'Camera',
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/79/36/76/1000_F_579367637_yRzBTxdPNekhuF52EywWkj2fOG2GKo3z.jpg',
    title: 'Coffee',
    cols: 2,
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/89/96/08/1000_F_589960863_sUzlvx66c7jlm4v4nr0pq84PJGOO0FjG.jpg',
    title: 'Hats',
    cols: 2,
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/17/52/46/1000_F_517524681_tA4FO8eHJ9QB1oFxInCKaAdekjuQugFY.jpg',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://as2.ftcdn.net/v2/jpg/05/82/04/41/1000_F_582044123_WHotD5KC4uLPvRc51D9yfaxONDqNQUlw.jpg',
    title: 'Basketball',
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/92/79/36/1000_F_592793663_kVvsV9g6hfdP6c4nuVXTE7Zzz2i0Y6WP.jpg',
    title: 'Fern',
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/89/66/46/1000_F_589664621_gOS12elihFXxDux9YayhK1SblrWx8yWL.jpg',
    title: 'Mushrooms',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://as1.ftcdn.net/v2/jpg/05/86/33/56/1000_F_586335639_znw8bTuXIZj9WH6IpslwUnH9MV2nhciK.jpg',
    title: 'Tomato basil',
  },
  {
    img: 'https://as2.ftcdn.net/v2/jpg/05/86/12/73/1000_F_586127332_yQwTGbW2q3HO6rUsBFdfnGtKdIV4Cs8y.jpg',
    title: 'Sea star',
  },
  {
    img: 'https://as2.ftcdn.net/v2/jpg/05/73/22/85/1000_F_573228530_lcjt013Rb7rvfh4TZK8KTBhyRChYSKWX.jpg',
    title: 'Bike',
    cols: 2,
  },
];
