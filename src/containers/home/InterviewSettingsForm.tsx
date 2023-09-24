import { Box, Button, Flex } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup"; // Import Yup for validation
import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import { PageNumbers } from "../../interface/home";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    interviewMode: Yup.string().required("Interview Mode is required"),
    interviewDuration: Yup.string().required("Interview Duration is required"),
    interviewLanguage: Yup.string().required("Interview Language is required"),
  });

  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldTouched,
    setFieldValue,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: "",
      interviewDuration: "",
      interviewLanguage: "",
    },
    validationSchema, // Use the validation schema here
    onSubmit: (values) => {
      console.log({ values });
      handleTab(2); // Move to the next step (index 2)
    },
  });

  return (
    <Box width="100%">
      <form onSubmit={handleSubmit}>
        <Box width="100%">
          <FormSelect
            label="Interview Mode"
            placeholder="Select interview mode"
            name="interviewMode"
            options={interviewModeOptions}
            onChange={setFieldValue}
            onBlur={() => setFieldTouched("interviewMode")} // Manually set field as touched
            value={values?.interviewMode}
            error={touched?.interviewMode && errors?.interviewMode}
          />
          {touched?.interviewMode && errors?.interviewMode && (
            <div className="error-message">{errors?.interviewMode}</div>
          )}

          <FormSelect
            label="Interview Duration"
            placeholder="Select interview duration"
            name="interviewDuration"
            options={interviewDurationOptions}
            onChange={setFieldValue}
            onBlur={() => setFieldTouched("interviewDuration")} // Manually set field as touched
            value={values?.interviewDuration}
            error={touched?.interviewDuration && errors?.interviewDuration}
          />
          {touched?.interviewDuration && errors?.interviewDuration && (
            <div className="error-message">{errors?.interviewDuration}</div>
          )}

          <FormSelect
            label="Interview Language"
            name="interviewLanguage"
            placeholder="Select interview language"
            options={interviewLanguageOptions}
            onChange={setFieldValue}
            onBlur={() => setFieldTouched("interviewLanguage")} // Manually set field as touched
            value={values?.interviewLanguage}
            error={touched?.interviewLanguage && errors?.interviewLanguage}
          />
          {touched?.interviewLanguage && errors?.interviewLanguage && (
            <div className="error-message">{errors?.interviewLanguage}</div>
          )}

          <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
            <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
              Previous
            </Button>
            <Button colorScheme="red" type="submit">
              Next
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default InterviewDetailsForm;
