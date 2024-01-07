import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "react-feather";

const DrawerComp = ({ open, setOpen, userInfo, handleLogout }) => {
  const { categories } = useSelector((state) => state.categories);
  const [openCategories, setOpenCategories] = useState(false);
  const [openManagement, setOpenManagement] = useState(false);

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
  };

  const handleManagementClick = () => {
    setOpenManagement(!openManagement);
  };

  return (
    <React.Fragment>
      <Drawer 
        anchor="left" 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: "80vw", maxWidth: 360 }
        }}
      >
        <List>
          <ListItemButton onClick={() => setOpen(false)}>
            <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemText primary="Home" />
            </NavLink>
          </ListItemButton>

          {categories && categories.length > 0 && (
            <>
              <ListItemButton onClick={handleCategoriesClick}>
                <ListItemText primary="Categories" />
                {openCategories ? <ChevronUp /> : <ChevronDown />}
              </ListItemButton>
              <Collapse in={openCategories} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categories.map((category) => (
                    <ListItemButton
                      key={category.id}
                      sx={{ pl: 4 }}
                      onClick={() => setOpen(false)}
                    >
                      <NavLink
                        to={`/?category_id=${category.id}&page=1`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItemText primary={category.name} />
                      </NavLink>
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          )}

          

          <ListItemButton onClick={() => setOpen(false)}>
            <NavLink to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemText primary="Cart" />
            </NavLink>
          </ListItemButton>

          {/* Management Section */}
          {userInfo && userInfo.isAdmin && (
            <>
              <ListItemButton onClick={handleManagementClick}>
                <ListItemText primary="Management" />
                {openManagement ? <ChevronUp /> : <ChevronDown />}
              </ListItemButton>
              <Collapse in={openManagement} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => setOpen(false)}
                  >
                    <NavLink
                      to="/admin/productList"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemText primary="Products List" />
                    </NavLink>
                  </ListItemButton>
                  {userInfo.isSuperuser && (
                    <>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => setOpen(false)}
                      >
                        <NavLink
                          to="/admin/userList"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemText primary="Users List" />
                        </NavLink>
                      </ListItemButton>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => setOpen(false)}
                      >
                        <NavLink
                          to="/admin/categoryList"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <ListItemText primary="Categories List" />
                        </NavLink>
                      </ListItemButton>
                    </>
                  )}
                  <ListItemButton
                    sx={{ pl: 4 }}
                    onClick={() => setOpen(false)}
                  >
                    <NavLink
                      to="/admin/orderList"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItemText primary="Orders List" />
                    </NavLink>
                  </ListItemButton>
                  {userInfo.isSuperuser && (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => setOpen(false)}
                    >
                      <NavLink
                        to="/admin/logs"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItemText primary="Logs" />
                      </NavLink>
                    </ListItemButton>
                  )}
                </List>
              </Collapse>
            </>
          )}

          <Divider />

          {userInfo ? (
            <React.Fragment>
              <ListItemButton onClick={() => setOpen(false)}>
                <NavLink to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemText primary="Profile" />
                </NavLink>
              </ListItemButton>
              <ListItemButton onClick={() => { handleLogout(); setOpen(false); }}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </React.Fragment>
          ) : (
            <ListItemButton onClick={() => setOpen(false)}>
              <NavLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <ListItemText primary="Login" />
              </NavLink>
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerComp;
