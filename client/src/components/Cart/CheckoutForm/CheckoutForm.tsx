import React, { useEffect, useState, useRef } from "react";
import { PublicTwoTone } from "@material-ui/icons";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { bounceInUp } from "react-animations";
import styled, { keyframes } from "styled-components";
import "./styles.css";
import { User } from "@auth0/auth0-spa-js";
import LocationSelector from "./MapSelection/LocationSelector";

/* BOUNCE ANIMATION*/

const bounceInUpAnimation = keyframes`${bounceInUp}`;

const BouncyDiv = styled.div`
  animation: 1s ${bounceInUpAnimation};
`;

const MercadoPago = window[`MercadoPago`];
const { REACT_APP_BASE_BACKEND_URL, REACT_APP_MP_PUBLIC_KEY } = process.env;

const CheckoutForm = ({
  active,
  setActive,
  productsToCheckout,
  auth0User,
  userId,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
  productsToCheckout: CartProductData[];
  auth0User: User;
  userId: string;
}) => {
  type CheckoutForm = {
    shippingAddress: string;
    email: string;
    streetNumber: number | "";
    mpButton: any;
    mpButtonLoading: "idle" | "loading" | "loaded" | "error";
    finalCheckbox: boolean;
  };

  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    shippingAddress: "",
    email: "",
    streetNumber: "",
    mpButton: null,
    mpButtonLoading: "idle",
    finalCheckbox: false,
  });

  const [checkoutData, setCheckoutData] = useState({
    data: null,
  });

  type ReturnLocation = {
    returnLatitude: number;
    returnLongitude: number;
    returnFullAddress: string;
  };

  const [returnLocation, setReturnLocation] = useState<ReturnLocation>({
    returnFullAddress: "",
    returnLatitude: 0,
    returnLongitude: 0,
  });

  const [mapActive, setMapActive] = useState(false);

  useEffect(() => {
    setCheckoutForm({
      ...checkoutForm,
      shippingAddress: returnLocation.returnFullAddress,
    });
    // eslint-disable-next-line
  }, [returnLocation]);

  useEffect(
    () => {
      if (checkoutForm.finalCheckbox === true && active) {
        const data = createCheckoutData(
          productsToCheckout,
          6,
          userId,
          checkoutForm.email,
          checkoutForm.shippingAddress,
          checkoutForm.streetNumber as number,
          returnLocation.returnLatitude,
          returnLocation.returnLongitude
        );
        setCheckoutData({ ...checkoutData, data });
      }
    },
    // eslint-disable-next-line
    [checkoutForm.finalCheckbox]
  );

  useEffect(() => {
    if (checkoutData.data) {
      (async () => {
        setCheckoutForm({
          ...checkoutForm,
          mpButtonLoading: "loading",
        });
        const checkoutId = await createPreference(checkoutData.data);
        const mp = new MercadoPago(`${REACT_APP_MP_PUBLIC_KEY}`, {
          locale: "es-AR",
        });

        const checkout = mp.checkout({
          preference: {
            id: checkoutId,
          },
        });
        setTimeout(() => {
          setCheckoutForm({
            ...checkoutForm,
            mpButton: checkout,
            mpButtonLoading: "loaded",
          });
        }, 2000);
      })();
    }
    // eslint-disable-next-line
  }, [checkoutData.data]);

  const locationInputRef = useRef(null);

  switch (active) {
    case true:
      return (
        <BouncyDiv>
          <div id="checkoutForm" className="checkoutForm">
            <div className="shippingForm" hidden={mapActive}>
              <Button
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  width: "fit-content",
                }}
                variant="contained"
                color="primary"
                size="small"
                onClick={(e) => {
                  setCheckoutForm({
                    shippingAddress: "",
                    email: "",
                    mpButton: null,
                    finalCheckbox: false,
                    mpButtonLoading: "idle",
                    streetNumber: "",
                  });
                  setActive(false);
                }}
              >
                Return to Cart
              </Button>
              <TextField
                id="standard-disabled"
                ref={locationInputRef}
                error={checkoutForm.shippingAddress === "" ? true : false}
                helperText={"Click the icon to find your street a address!"}
                disabled={true}
                label="Shipping Address"
                value={checkoutForm.shippingAddress}
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => {
                        setCheckoutForm({
                          ...checkoutForm,
                          mpButton: null,
                          mpButtonLoading: "idle",
                          finalCheckbox: false,
                          shippingAddress: "",
                        });
                        setMapActive(true);
                      }}
                    >
                      <PublicTwoTone />
                    </Button>
                  ),
                }}
                onChange={(e) => {
                  setCheckoutForm({
                    ...checkoutForm,
                    mpButton: null,
                    mpButtonLoading: "idle",
                    finalCheckbox: false,
                    shippingAddress: e.target.value,
                  });
                }}
              />
              <br />
              <TextField
                error={
                  checkoutForm.streetNumber > 0 &&
                  checkoutForm.streetNumber !== ""
                    ? false
                    : true
                }
                type="number"
                helperText={"Input your street number"}
                id="standard-disabled-32"
                label="Street number"
                value={checkoutForm.streetNumber}
                onChange={(e) => {
                  if (
                    checkoutForm.mpButton ||
                    checkoutForm.mpButtonLoading !== "idle" ||
                    checkoutForm.finalCheckbox
                  ) {
                    return setCheckoutForm({
                      ...checkoutForm,
                      mpButton: null,
                      mpButtonLoading: "idle",
                      finalCheckbox: false,
                      streetNumber: parseInt(e.target.value),
                    });
                  }
                  setCheckoutForm({
                    ...checkoutForm,
                    streetNumber: parseInt(e.target.value),
                  });
                }}
              />
              <br />
              <TextField
                error={
                  validateEmail(checkoutForm.email) === true ? false : true
                }
                helperText={"Input a valid email address"}
                id="standard-disabled-2"
                label="Email for notifications"
                value={checkoutForm.email}
                onChange={(e) => {
                  setCheckoutForm({
                    ...checkoutForm,
                    mpButton: null,
                    mpButtonLoading: "idle",
                    finalCheckbox: false,
                    email: e.target.value,
                  });
                }}
              />
            </div>
            <LocationSelector
              setReturnLocation={setReturnLocation}
              active={mapActive}
              setActive={setMapActive}
              mapWidth={"50vw"}
              mapHeight={"50vh"}
            />
            <FormControlLabel
              hidden={mapActive}
              control={
                <Checkbox
                  disabled={
                    validateEmail(checkoutForm.email) !== true ||
                    checkoutForm.shippingAddress === "" ||
                    checkoutForm.streetNumber <= 0
                  }
                  checked={checkoutForm.finalCheckbox}
                  onChange={(e) => {
                    if (e.target.checked === false) {
                      return setCheckoutForm({
                        ...checkoutForm,
                        mpButton: null,
                        mpButtonLoading: "idle",
                        finalCheckbox: e.target.checked,
                      });
                    }
                    return setCheckoutForm({
                      ...checkoutForm,
                      finalCheckbox: e.target.checked,
                    });
                  }}
                />
              }
              label="Click here to confirm that the information provided is correct"
            />
            <br></br>
            {displayMPButton(
              checkoutForm.mpButtonLoading,
              checkoutForm.mpButton,
              checkoutForm.finalCheckbox
            )}
          </div>
        </BouncyDiv>
      );

    case false:
      return <div></div>;

    default:
      return <div>Nothing rendering in Checkout Form</div>;
  }
};

export default CheckoutForm;

/* -----------------HERLPERS------------------------*/

const createCheckoutData = (
  products: CartProductData[],
  installments: number,
  userId: string,
  email: string,
  shippingAddress: string,
  streetNumber: number,
  latitude: number,
  longitude: number
): PreferenceData => {
  const data: PreferenceData = {
    id: ``,
    installments: installments,
    payer: {
      email: email,
      address: {
        street_number: streetNumber,
        zip_code: "",
        street_name: shippingAddress,
      },
    },
    external_reference: userId,
    items: products.map((item) => {
      return {
        id: item.productOption.optionId,
        category_id: "fashion",
        description: "",
        quantity: item.productOption.optionQuantity,
        title: item.baseName,
        unit_price: item.basePrice,
      };
    }),
    latitude,
    longitude,
  };
  return data;
};

const createPreference = async (data: PreferenceData) => {
  const res = await axios.post(
    `${REACT_APP_BASE_BACKEND_URL}/mercadopago/create_preference`,
    data
  );
  if (res) {
    return res.data.response.id;
  }
};

const validateEmail = (email: string) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const displayMPButton = (
  loadingButton: "loading" | "loaded" | "idle" | "error",
  mpButton: any,
  finalCheck: boolean
) => {
  if (finalCheck === true) {
    switch (loadingButton) {
      case "loading":
        return <span>Loading</span>;

      case "loaded":
        return (
          <Button
            variant="contained"
            onClick={async () => {
              mpButton.open();
            }}
          >
            Proceed to payment!
          </Button>
        );
      case "error":
        return <span>Error</span>;
      case "idle":
        return <span></span>;
      default:
        return <span></span>;
    }
  }
  return <div></div>;
};

type CartProductData = {
  baseId: string;
  baseName: string;
  basePrice: number;
  baseImage: string;
  productOption: {
    optionId: string;
    optionSize: string;
    optionColor: string;
    optionImage: string;
    optionStock: number;
    optionQuantity: number;
  };
  inCartId: string;
};

type CheckoutItem = {
  id: string;
  category_id: string;
  title: string;
  unit_price: number;
  quantity: number;
  description: string;
} | null;

type PreferenceData = {
  payer: {
    email: string;
    address: {
      street_name: string;
      zip_code: string;
      street_number: number;
    };
  };
  external_reference: string;
  id: string;
  installments: number;
  items: CheckoutItem[];
  latitude: number;
  longitude: number;
};
