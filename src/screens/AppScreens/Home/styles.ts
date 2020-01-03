import { StyleSheet } from "react-native";
import { colors } from "../../../constants";
const styles = StyleSheet.create({
  text: {
    color: "#000000",
    fontWeight: "600"
  },
  container: {
    flex: 1,
    backgroundColor: colors.containerBg
  },
  loadingFooter: {
    justifyContent: "center",
    alignItems: "center"
  },
  homeContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    margin: 1,
    backgroundColor: colors.containerColor
  },
  homeContainerRow: {
    display: "flex",
    flexDirection: "row"
  },
  label: {
    flex: 0.4,
    paddingLeft: 3,
    paddingTop: 1,
    paddingBottom: 1
  },
  data: {
    flex: 0.4,
    marginLeft: 80,
    paddingTop: 1,
    paddingBottom: 1
  },
  updateButton: {
    padding: 1,
    paddingLeft: 2,
    paddingBottom: 3,
    width: 100
  },
  deleteButton: {
    padding: 1,
    paddingLeft: 100,
    paddingBottom: 3
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
  linkText: {
    color: colors.primary,
    fontWeight: "700"
  },
  buttonStyle: {
    backgroundColor: colors.primary,
    height: 30,
    width: 100,
    alignItems: "center",
    borderRadius: 4
  },
  buttonTextStyle: {
    color: colors.containerBg,
    fontSize: 14,
    marginTop: 4
  },
  pickerStyle: {
    height: 50,
    width: "90%",
    color: "#344953",
    justifyContent: "center"
  },
  searchInput: {
    padding: 10,
    borderColor: "#CCC",
    borderWidth: 1,
    backgroundColor: "#F4F4F4"
  },
  pickerContainer: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    margin: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center"
  },
  serviceDetailsText: {
    color: "#000000",
    fontSize: 22,
    paddingLeft: 5,
    paddingBottom: 3
  },
  serviceCenterLabel: {
    paddingLeft: 5,
    paddingBottom: 3
  },
  serviceCenterText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 22
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default styles;
