import * as Yup from "yup";
import moment from 'moment';

export const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required("le prenom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    lastname: Yup.string()
        .required("le nom est obligatoire")
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    // dateOfBirth: Yup.date()
    //     .nullable()
    //     .required("Please enter your date of birth"),
    // dateOfStart: Yup.date()
    //     .required("Please enter your date of start"),
    street: Yup.string()
        .required("la rue est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    city: Yup.string()
        .required("la ville est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    // state: Yup.string()
    //     .required("le pays est obligatoire")
    //     .min(1, "trop petit!")
    //     .max(50, "trop long!"),
    zipCode: Yup.string()
        .required("le code postale est obligatoire")
        .min(1, "trop petit!")
        .max(50, "trop long!"),
    
});