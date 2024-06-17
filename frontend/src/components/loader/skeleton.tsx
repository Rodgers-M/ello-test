import { Grid, Skeleton } from "@mui/material";
import { FC } from "react";

export const SkeletonLoader: FC<{ numberOfRows: number }> = ({
  numberOfRows,
}) => {
  // this works best on desktopView
  // screensize can be used to adjust the number of items according to the
  // number of items per row
  const numberOfItems = numberOfRows * 4;
  return (
    <Grid
      container
      spacing={2}
      justifyContent={"center"}
      sx={{ width: "90vw" }}
    >
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <Grid item xs={10} sm={6} md={4} lg={3} key={index}>
          <Skeleton variant="rectangular" height={118} />
          <Skeleton />
          <Skeleton width="70%" />
        </Grid>
      ))}
    </Grid>
  );
};
