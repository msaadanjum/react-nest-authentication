import { FormControl, FormHelperText, FormLabel, Input, InputProps, } from "@mui/joy";
import { useField, useFormikContext } from "formik";


interface Props {
    joyProps?: InputProps;
}

export default function FormikInput(props: Props) {
    const {
        errors,
        setFieldValue,
        setErrors,
    } = useFormikContext<any>();
    const [field,] = useField(props.joyProps as any);

    return (
        <FormControl error={errors[field.name] ? true : false}>
            <Input
                onChange={(event: any) => {
                    setFieldValue(field.name, event.target.value)
                    setErrors({ ...errors, [field.name]: undefined },)
                }}
                {...props.joyProps}
            />
            <FormHelperText sx={{ textAlign: 'left' }}>
                {
                    errors[field.name] && errors[field.name] as any
                }
            </FormHelperText>
        </FormControl>
    )

}