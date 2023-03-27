import * as Yup from "yup";
import moment from 'moment';

export const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("le prenom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(2, "trop petit!")
        .max(50, "trop long!"),
    lastname: Yup.string() 
        .required("le nom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(2, "trop petit!")
        .max(50, "trop long!"),
    //dateOfBirth: Yup.string()
    //    .required("Please enter your date of birth"),
    //dateOfStart: Yup.date()
    //     .required("Please enter your date of start"), 
    street: Yup.string()
        .required("la rue est obligatoire") 
        .min(2, "trop petit!")
        .max(50, "trop long!"),
    city: Yup.string()
        .required("la ville est obligatoire")
        .min(2, "trop petit!")
        .max(50, "trop long!"),
    zipCode: Yup.string()
        .required("le zip code est obligatoire")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'doit avoir exactement 5 chiffres')
        .max(5, 'doit avoir exactement 5 chiffres')
    
});