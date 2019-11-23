import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  text:{
    color: '#000000',
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
  addressContainer:{
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    margin: 1,
    backgroundColor: colors.containerColor
  },
  addressContainerRow:{
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
  },
  headStyle: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor
  },
  headText: {
    fontSize: 18,
    fontWeight: "700"
  },
  inputContainer: {
    justifyContent: "center",
    padding: 20
  },
  signupLink: {
    flexDirection: "row",
    justifyContent: "center"
  },
  linkText: {
    color: colors.primary,
    fontWeight: "700"
  }
});

export default styles;
