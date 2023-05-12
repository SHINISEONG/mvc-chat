import { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Stack, Typography, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import axios from 'axios';
import { useParams } from 'react-router';
import { IProduct } from '@/typings/db';

const ProductDetail = () => {
  const { productNo } = useParams();
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    axios
      .get(
        `http://${
          import.meta.env.VITE_SPRING_SVR_URL
        }:8080/api/product/detail/productno/${productNo}`
      )
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Grid
      container
      spacing={4}
      sx={{
        marginTop: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // height: '100vh',
      }}
    >
      <Grid xs={12} mdOffset={1} md={4}>
        <Carousel>
          {product?.fileNames.map((fileName: string, i: number) => (
            <img
              key={i}
              loading="lazy"
              src={`http://${
                import.meta.env.VITE_SPRING_SVR_URL
              }:8080/images/uploadFiles/${fileName}?w=248&fit=crop&auto=format`}
              srcSet={`http://${
                import.meta.env.VITE_SPRING_SVR_URL
              }:8080/images/uploadFiles/${fileName}?w=248&fit=crop&auto=format&dpr=2 2x`}
            />
          ))}
        </Carousel>
      </Grid>
      <Grid xs={12} md={6}>
        <Stack width={'100%'}>
          <Typography variant="h4">{product?.prodName}</Typography> <br />
          <Typography>{product?.prodDetail}</Typography> <br />
          <Stack direction="row">
            <Typography>Price : </Typography>
            <Typography>&nbsp;{product?.price}</Typography>
          </Stack>
          <Stack direction="row">
            <Typography>Quantity</Typography>

            <Select variant="standard" value={''}>
              <MenuItem value={10} selected>
                10
              </MenuItem>
            </Select>
          </Stack>
          <br />
          <Stack direction="row">
            <Button>Cart&nbsp;</Button>
            <Button>Buy Now</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;
