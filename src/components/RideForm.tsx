import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { countriesAndCities } from "../utils/countries-and-cities.ts";
import { useRideForm } from "../hook/useRideForm.ts";
import { z } from "zod";
import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import SucessBox from "./SucessBox.tsx";

const RideForm = () => {
  const {
    rideFormSchema,
    register,
    handleSubmit,
    errors,
    country,
    setCountry,
    city,
    setCity,
    checked,
    setChecked,
    handleChange,
    updateForm,
    fetchForm,
    IconsAndTypes,
    selectedValue,
    setSelectedValue,
    handleChangeRadio,
  } = useRideForm();

  const OrangeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#FBA403",
      "&:hover": {
        backgroundColor: alpha("#FBA403", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#FBA403",
    },
  }));

  const label = { inputProps: { "aria-label": "I drive my own car checkbox" } };

  const onSubmit: SubmitHandler<z.infer<typeof rideFormSchema>> = (data) => {
    updateForm(data);
    setisFormSent(true);
  };

  const Countries = Object.keys(countriesAndCities);

  const [isFormSent, setisFormSent] = useState(false);


  return (
    <Box className="bg-cinzaEscuro py-10">
      {isFormSent ? (
        <Box className="flex pt-10  gap-5 bg-cinzaForm mx-20 pl-10">
          <SucessBox />
        </Box>
      ) : (
        <Box>
          <Box className="flex pt-10  gap-5 bg-cinzaForm mx-20 pl-10">
            <img src="cartoon-car.svg" alt="A cartoon of a yellow card" />
            <Box className="flex flex-col my-auto">
              <Typography className="text-laranja font-bold text-[27px]">
                Drive with MyRide
              </Typography>
              <Typography className="text-white">
                Register as a driver using the form below. Our team will assess
                and get back to you within 48 hours.
              </Typography>
            </Box>
          </Box>
          <Box component="div" className=" mx-20 py-5 px-8 bg-cinzaForm ">
            <form>
              <Stack>
                <TextField
                  className="  w-full mb-5 text-laranja bg-cinzaForm  "
                  id="fullname"
                  variant="outlined"
                  aria-label="Full Name Input"
                  placeholder="Full Name"
                  inputProps={{ "data-testid": "fullname" , "className": "bg-cinzaForm h-[36px] text-white rounded outline outline-1 outline-white	 " }}
                  {...register("fullname")}
                />

                {errors.fullname ? (
                  <Typography className="text-red-600 flex  gap-2 items-center -mt-2 mb-3">
                    <ErrorIcon className="text-sm items-center" /> Invalid name
                  </Typography>
                ) : null}

                <TextField
                  className="w-full pb-5 text-white"
                  id="email"
                  variant="outlined"
                  aria-label="Email Adress Input"
                  placeholder="Email Adress"
                  inputProps={{ "data-testid": "email" , "className": "bg-cinzaForm h-[36px] text-white rounded outline outline-1 outline-white" }}
                  {...register("email")}
                />

                {errors.email ? (
                  <Typography className="text-red-600 flex  gap-2 items-center -mt-2 mb-3">
                    {" "}
                    <ErrorIcon className="text-sm items-center" /> Invalid email
                  </Typography>
                ) : null}

                <Select
                  className="w-full mb-5 text-white"
                  labelId="Country"
                  id="country"
                  inputProps={{ "data-testid": "country", "className": "bg-cinzaForm  text-white rounded outline outline-1 outline-white placeholder-white"}}
                  value={country}
                  label="Country"
                  {...register("country")}
                  onChange={(event) => setCountry(event?.target.value)}
                >
                  {Countries.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>

                {errors.country ? (
                  <Typography className="text-red-600 flex  gap-2 items-center -mt-2 mb-3">
                    <ErrorIcon className="text-sm items-center" /> Invalid
                    country
                  </Typography>
                ) : null}

                <Select
                  className="w-full mb-5 text-white  placeholder:text-white"
                  labelId="City"
                  id="city"
                  value={city}
                  label="City"
                  placeholder="City"
                  inputProps={{ "data-testid": "city" ,  "className": "bg-cinzaForm h-[36px] text-white rounded outline outline-1 outline-white placeholder-white"}}
                  disabled={country === "" ? true : false}
                  {...register("city")}
                  onChange={(event) => setCity(event?.target.value)}
                >
                  {country &&
                    countriesAndCities[country].map((value, index) => (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                </Select>

                {errors.city ? (
                  <Typography className="text-red-600 flex  gap-2 items-center -mt-2 mb-3">
                    <ErrorIcon className="text-sm items-center" /> Invalid city
                  </Typography>
                ) : null}

                <TextField
                  className="w-full pb-5 text-white"
                  id="referralcode"
                  variant="outlined"
                  aria-label="Referral Code Input"
                  placeholder="Referral Code"
                  inputProps={{ "data-testid": "referralcode", "className": "bg-cinzaForm h-[36px] text-white rounded outline outline-1 outline-white"}}
                  {...register("referralcode")}
                />

                {errors.referralcode ? (
                  <Typography className="text-red-600 flex  gap-2 items-center -mt-2 mb-3">
                    <ErrorIcon className="text-sm items-center" /> Invalid code
                  </Typography>
                ) : null}

                <Box className="flex justify-between flex-col pb-6 ">
                  <Box className="w-full flex justify-between ">
                    <Typography className="text-white">
                      I drive my own car
                    </Typography>

                    <OrangeSwitch
                      {...label}
                      checked={checked}
                      inputProps={{ "data-testid": "myowncar" }}
                      {...register("myowncar")}
                      onChange={handleChange}
                    />
                  </Box>

                  {checked ? (
                    <RadioGroup
                      aria-label="Your car type select"
                      defaultValue={selectedValue}
                      overlay
                      id="cartype"
                      {...register("cartype")}
                      onChange={handleChangeRadio}
                      sx={{
                        flexDirection: "row",
                        gap: 2,
                        [`& .${radioClasses.checked}`]: {
                          [`& .${radioClasses.action}`]: {
                            inset: -1,
                            border: "3px solid",
                            borderColor: "#ffffff",
                          },
                        },
                        [`& .${radioClasses.radio}`]: {
                          display: "contents",
                          "& > svg": {
                            zIndex: 2,
                            position: "absolute",
                            top: "-8px",
                            right: "-8px",
                            bgcolor: "background.surface",
                            borderRadius: "50%",
                            color: "#FBA403",
                          },
                        },
                      }}
                    >
                      <Box className="flex flex-col">
                        <FormLabel className="pb-4 text-laranja font-medium text-xl">
                          Select your car type
                        </FormLabel>
                        <Box className="flex flex-row gap-5">
                          {IconsAndTypes.map((value) => (
                            <Sheet
                              component="label"
                              className="bg-cinzaForm w-[147px]"
                              key={value.type}
                              variant="outlined"
                              sx={{
                                borderRadius: "md",

                                boxShadow: "sm",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1.5,
                                p: 2,
                                minWidth: 120,
                              }}
                            >
                              <Radio
                                id={value.icon}
                                value={value.type}
                                checkedIcon={<CheckCircleRoundedIcon />}
                                onChange={setSelectedValue}
                              />
                              <img src={value.icon} />
                              <FormLabel
                                className="text-white text-sm"
                                htmlFor={value.icon}
                              >
                                {value.type}
                              </FormLabel>
                            </Sheet>
                          ))}
                        </Box>
                      </Box>
                    </RadioGroup>
                  ) : null}
                </Box>
                <Button
                  type="button"
                  // inputProps={{ "data-testid": "submit" }}
                  onClick={handleSubmit(onSubmit)}
                  className="bg-[#FBA403] max-w-[200px] h-[56px] text-white "
                >
                  {" "}
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>{" "}
        </Box>
      )}
    </Box>
  );
};

export default RideForm;
