import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  text:{
    color: "#00000",
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor: colors.containerBg,
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  vehicleContainer:{
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.primarydarkblue,
    margin: 1,
    backgroundColor: colors.containerColor
  },
  vehicleContainerRow:{
    display: "flex",
    flexDirection: "row"
  },
  label:{
    flex: 0.4,
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1
  },
  data:{
    flex: 0.6,
    paddingTop: 1,
    paddingBottom: 1
    
  },
  updateButton:{
    padding: 1,
    paddingLeft: 2,
    paddingBottom: 2
  },
  deleteButton: {
    padding: 1,
    paddingBottom: 2
  }
});

export default styles;
