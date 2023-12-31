import React, { useEffect, useState } from "react"
import { Buffer } from 'buffer';

import {
  Container,
  Divider,
  Flex,
  Image,
  Select,
  Text,
  Button,
  Center,
} from "@chakra-ui/react"
import { useCartAction, useCart } from "../providers/cartProvider"
import { Link } from "react-router-dom"
import Card from "../common/card"
// import { products } from "../data/data"
import Layout from "../layout/layout"
import { CheckInCart } from "../utils/checkInCart"
import { authService, getBikes } from "../services/auth.service"


// export interface BikeDto {
//   name: string;
//   type: string;
//   price: number;
//   image?: any;
//   find?: any;
// }

export interface BikeDto {
  name: string;
  price: number;
  // offPrice: number;
  type: string;
  // bg: string;
  image: any;
  // id: number;
  // size: number;
  // color: string;
  // qty?: number;
  find?: any;
}

const ShopPage = (): JSX.Element => {

  const [bikes, setBikes] = useState<BikeDto[]>([]);

  useEffect(() => {

    // declare the data fetching function
    const fetchData = async () => {
      const data = await authService.getBikes();
      for (const bike of data) {
        bike.image = blobToImage(bike)
      }
      setBikes(data);
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  const blobToImage = (product: any) => {
    const res = Buffer.from(product.image.data).toString();
    return 'data:image/png;base64,' + res;

  };


  const dispatch = useCartAction()
  const { cart } = useCart()

  const addToCart: AddTodCartProps = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product })
  }

  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex mt="10" w="full" justifyContent="space-between">
          <Flex flexDir="column">
            <Text
              fontSize={["27px", "27px", "35px", "35px", "35px"]}
              fontWeight="600"
              color="#191919"
              style={{ fontFamily: "ralewayBold" }}
            >
              Find your favorite bike
            </Text>
            <Text
              fontSize={["14px", "15px", "17px", "17px", "17px"]}
              mt="-4px"
              color="#7E7E7E"
              style={{ fontFamily: "ralewayMedium" }}
            >
              Choose your way with the appropriate bike.
            </Text>
          </Flex>
          {/* <Select
            display={["none", "none", "block", "block", "block"]}
            w="230px"
            h="30px"
            fontSize="15px"
            placeholder="Select option"
            style={{ fontFamily: "ralewayMedium" }}
          >
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select> */}
        </Flex>
        <Divider mt="8" mb="8" borderColor="#E3E3E3" />
        <Flex
          justifyContent={[
            "center",
            "center",
            "center",
            "center",
            "space-between",
          ]}
          flexWrap="wrap"
        >
          {bikes.map((product) => {
            return (
              <Card
                mb="14"
                key={product.name}
                flexDir="column"
                p="0"
                m="4"
                rounded="22px"
                w="365px"
                h="365px"
                boxShadow="sm"
                style={{ fontFamily: "ralewayMedium" }}
              >
                <Flex
                  w="full"
                  h="236px"
                  rounded="22px"
                  p="4"
                  justifyContent="center"
                  alignItems="center"
                  bg={product.type}
                >
                  <Image w="270px" objectFit="cover" src={product.image} />
                </Flex>
                <Link to={`/bike/${product.name}`} state={product}>
                  <Flex p="4" justifyContent="space-between">
                    <Flex flexDir="column">
                      <Text
                        fontWeight="700"
                        fontSize="23px"
                        style={{ fontFamily: "ralewayBold" }}
                      >
                        {product.name}
                      </Text>
                      <Text
                        w="230px"
                        fontSize="13px"
                        mt="-2px"
                        color="#7E7E7E"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                      >
                        {product.type}
                      </Text>
                    </Flex>
                    <Text>$ {product.price}</Text>
                  </Flex>
                </Link>
                <Center>
                  <Button
                    fontSize="14px"
                    border="1px solid"
                    borderColor="#191919"
                    rounded="8"
                    _focus={{}}
                    _hover={{}}
                    h="30px"
                    w="92%"
                    variant="outline"
                    onClick={() => addToCart(product)}
                  >
                    {CheckInCart(cart, product) ? "In Cart" : "Buy Now"}
                  </Button>
                </Center>
              </Card>
            )
          })}
        </Flex>
      </Container>
    </Layout>
  )
}

export default ShopPage
