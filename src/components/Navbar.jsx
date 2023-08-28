import { AppBar, Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ mb: 8 }}>
      <AppBar component="nav">
        <Container maxWidth="md" sx={{ py: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/" style={{ color: "white" }}>
              <Typography
                component="h3"
                sx={{ fontWeight: "bold", fontSize: 20 }}
              >
                Todo App
              </Typography>
            </Link>

            <Box sx={{ display: "flex", gap: 3 }}>
              <Link to="/" style={{ color: "white" }}>
                <Typography
                  component="h3"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Home
                </Typography>
              </Link>
              <Link to="/add-todo" style={{ color: "white" }}>
                <Typography
                  component="h3"
                  sx={{ fontWeight: 600, fontSize: 16 }}
                >
                  Add Todo
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
