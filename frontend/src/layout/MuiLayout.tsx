import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy";


export default function MuiLayout(props: any) {
    return (
        <CssVarsProvider defaultMode="light" disableTransitionOnChange>
            <CssBaseline />
            <GlobalStyles
                styles={{
                    ':root': {
                        '--Form-maxWidth': '800px',
                        '--Transition-duration': '0.4s', // set to `none` to disable transition
                    },
                }}
            />
            {props.children}
        </CssVarsProvider>

    )
}