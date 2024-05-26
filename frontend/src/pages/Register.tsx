import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import ApiRequest from '../essentials/Api';
import { useState } from 'react';
import FormikInput from '../components/FormikInput';
import { Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


interface SignupFormInterface {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export default function Register() {


    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleFormSubmission = async (values: SignupFormInterface, { setErrors }: FormikHelpers<SignupFormInterface>) => {
        await ApiRequest({
            url: 'register', method: "POST", data: values,
            loader: setLoading
        }).then(() => {
            toast.success("Registration successful.")
            navigate('/')
        }).catch(error => {
            setErrors(error?.response?.data ?? {})
        })
    }

    const setInitialData = () => {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    }

    return (
        <Box>
            <Box
                sx={(theme) => ({
                    width: { xs: '100%', md: '50vw' },
                    transition: 'width var(--Transition-duration)',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    backdropFilter: 'blur(12px)',
                    backgroundColor: 'rgba(255 255 255 / 0.2)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundColor: 'rgba(19 19 24 / 0.4)',
                    },
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100dvh',
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box
                        component="header"
                        sx={{
                            py: 3,
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
                            <IconButton variant="soft" color="primary" size="sm">
                                <BadgeRoundedIcon />
                            </IconButton>
                            <Typography level="title-lg">Easy Generator</Typography>
                        </Box>
                    </Box>
                    <Box
                        component="main"
                        sx={{
                            my: 'auto',
                            py: 2,
                            pb: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            width: 400,
                            maxWidth: '100%',
                            mx: 'auto',
                            borderRadius: 'sm',
                            '& form': {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            },
                            [`& .MuiFormLabel-asterisk`]: {
                                visibility: 'hidden',
                            },
                        }}
                    >
                        <Stack gap={4} sx={{ mb: 2 }}>
                            <Stack gap={1}>
                                <Typography component="h1" level="h3">
                                    Register
                                </Typography>
                                <Typography level="body-sm">
                                    Already have an account?{' '}
                                    <Link to="/">
                                        Login!
                                    </Link>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack gap={4} sx={{ mt: 2 }}>

                            <Formik
                                validateOnBlur={false}
                                validateOnChange={false}
                                initialValues={setInitialData()}
                                onSubmit={handleFormSubmission}
                                enableReinitialize={true}
                            >
                                {({
                                    handleSubmit,
                                    isSubmitting,
                                    handleChange,
                                    values
                                }) => (

                                    <form
                                        onSubmit={handleSubmit}
                                    >
                                        <FormControl required>
                                            <FormLabel>Name</FormLabel>
                                            {/* <Input type="text" name="name" /> */}
                                            <FormikInput joyProps={{
                                                type: "text",
                                                name: "name",
                                                required: true
                                            }} />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>Email</FormLabel>
                                            <FormikInput joyProps={{
                                                type: "email",
                                                name: "email",
                                                required: true
                                            }} />
                                        </FormControl>
                                        <FormControl required>
                                            <FormLabel>Password</FormLabel>
                                            <FormikInput joyProps={{
                                                type: "password",
                                                name: "password",
                                                required: true
                                            }} />
                                        </FormControl>
                                        <Stack gap={4} sx={{ mt: 2 }}>
                                            <Button loading={loading} type="submit" fullWidth>
                                                Register
                                            </Button>
                                        </Stack>
                                    </form>
                                )}
                            </Formik>

                        </Stack>
                    </Box>
                    <Box component="footer" sx={{ py: 3 }}>
                        <Typography level="body-xs" textAlign="center">
                            © Easy Generator {new Date().getFullYear()}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={(theme) => ({
                    height: '100%',
                    position: 'fixed',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    left: { xs: 0, md: '50vw' },
                    transition:
                        'background-image var(--Transition-duration), left var(--Transition-duration) !important',
                    transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
                    backgroundColor: 'background.level1',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1533136251085-1abf189c72e0)',
                    [theme.getColorSchemeSelector('dark')]: {
                        backgroundImage:
                            'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
                    },
                })}
            />
        </Box>
    );
}