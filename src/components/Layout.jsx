import React from 'react';
import SchemaSelector from "./SchemaSelector";
import {Route, Routes, Link} from "react-router-dom";
import WelcomePage from '/components/WelcomePage.jsx';
import OpenApiPage from '/components/OpenApiPage.jsx';
import AsyncApiPage from '/components/AsyncApiPage.jsx';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { styled, alpha, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ApiIcon from '@mui/icons-material/Api';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function Layout() {
    const drawerWidth = 240;

    const theme = useTheme();

    const layoutDrawerOpenStateLocalstorageKey = 'layoutDrawerOpen';

    const [draverOpened, setDraverOpened] = React.useState(
        localStorage.getItem(layoutDrawerOpenStateLocalstorageKey) === "true"
    );

    const handleDrawerOpen = () => {
        localStorage.setItem(layoutDrawerOpenStateLocalstorageKey, "true");
        setDraverOpened(true);
    };

    const handleDrawerClose = () => {
        localStorage.setItem(layoutDrawerOpenStateLocalstorageKey, "false");
        setDraverOpened(false);
    };

    const Main = styled('main', {
        shouldForwardProp: (prop) => {console.log(prop, 'PROP'); return prop !== 'open';} }
    )(
        ({ theme, draverOpened }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            ...(!draverOpened && {
                marginLeft: 0,
            }),
            ...(draverOpened && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: `${drawerWidth}px`,
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open',})
    (
        ({ theme, draverOpened }) => ({
            transition: theme.transitions.create(
                ['margin', 'width'],
                {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }
            ),
            ...(draverOpened && {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(
                    ['margin', 'width'],
                    {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }
                ),
            }),
        })
    );

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const MenuItem = ({to, primary, icon}) => (
        <ListItem button component={Link} to={to} selected={to === location.pathname}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItem>
    );

    const StyledSchemaSelector = styled(SchemaSelector)(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: '#fff',
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline/>
            <AppBar position="fixed" open={draverOpened}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, ...(draverOpened && { display: 'none' }) }}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>API Dashboard</Typography>
                    <StyledSchemaSelector />
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={draverOpened}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <MenuItem to="/openapi" icon={(<ApiIcon/>)} primary="OpenApi"></MenuItem>
                    <MenuItem to="/asyncapi" icon={(<ApiIcon/>)} primary="AsyncApi"></MenuItem>
                </List>
            </Drawer>
            <Main open={draverOpened}>
                <DrawerHeader />
                <Routes>
                    <Route path="*" element={<WelcomePage/>} />
                    <Route path="/openapi" element={<OpenApiPage/>}>
                        <Route path=":schemaSlug" element={<OpenApiPage/>} />
                    </Route>
                    <Route path="/asyncapi" element={<AsyncApiPage/>}>
                        <Route path=":schemaSlug" element={<AsyncApiPage/>} />
                    </Route>
                </Routes>
            </Main>
        </Box>
    );
};
