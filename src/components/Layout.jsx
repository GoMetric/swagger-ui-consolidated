import React, {useEffect} from 'react';
import SchemaSelector from "./SchemaSelector";
import {Route, Routes, Link, useLocation, useNavigate} from "react-router-dom";
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
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ApiIcon from '@mui/icons-material/Api';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useSchemasStore } from '../hooks';
import { SchemaStandard } from '../constants';

const drawerWidth = 240;
const layoutDrawerOpenStateLocalstorageKey = 'layoutDrawerOpen';

export default function Layout() {
    const location = useLocation();
    const schemasStore = useSchemasStore();
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setDraverOpened] = React.useState(
        localStorage.getItem(layoutDrawerOpenStateLocalstorageKey) === "true" || localStorage.getItem(layoutDrawerOpenStateLocalstorageKey) === null
    );

    useEffect(() => {
        (async () => {
            await schemasStore.fetchSchemas();
        })();
    }, []);

    if (!schemasStore.isReady) {
        return null;
    }

    const handleDrawerOpen = () => {
        localStorage.setItem(layoutDrawerOpenStateLocalstorageKey, "true");
        setDraverOpened(true);
    };

    const handleDrawerClose = () => {
        localStorage.setItem(layoutDrawerOpenStateLocalstorageKey, "false");
        setDraverOpened(false);
    };

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const MenuItem = ({standard , primary, icon}) => (
        <ListItemButton
          component={Link}
          to={`/${standard}`}
          onClick={(event) => {
              event.preventDefault();

              schemasStore.setCurrentSchema({
                  standard,
                  navigate,
              });
          }}
          selected={location.pathname.indexOf(standard) === 0}
        >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={primary} />
        </ListItemButton>
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
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
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
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <MenuItem
                      key={SchemaStandard.OPENAPI}
                      standard={SchemaStandard.OPENAPI}
                      icon={(<ApiIcon/>)}
                      primary="OpenApi"
                    />
                    <MenuItem
                      key={SchemaStandard.ASYNCAPI}
                      standard={SchemaStandard.ASYNCAPI}
                      icon={(<ApiIcon/>)}
                      primary="AsyncApi"
                    />
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Routes>
                    <Route path="/openapi/:slug" element={<OpenApiPage/>} />
                    <Route path="/asyncapi/:slug" element={<AsyncApiPage/>} />
                    <Route path="*" element={<WelcomePage/>} />
                </Routes>
            </Main>
        </Box>
    );
};
