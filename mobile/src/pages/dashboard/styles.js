import React from 'react';
import  { StyleSheet } from 'react-native';

export default StyleSheet.create({
    dasboardHeader: {
        backgroundColor: "#FFF",
        margin: 10,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
    },

    dashboardContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        paddingBottom: 30,
    },

    dashboardHeaderContainer: {
        flexDirection: "row",
    },

    helloTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    helloName: {
        fontSize: 15,
        color: "#555",
    },

    descriptionText: {
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
        color: "#555",
    },

    titleTask: {
        marginTop: 200,
        fontWeight: "bold",
        fontSize: 20,
        backgroundColor: "#0074D9",
        color: "#FFF",
        textAlign: "center",
        paddingBottom: 4,
        paddingTop: 4,
    },

    takscontainer: {
        margin: 30,
        backgroundColor: "#FFF",
        padding: 30,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 8,
    },

    titletask: {
        fontWeight: "bold",
        fontSize: 17,
    },

    desctask: {
        color: "#444",
        marginBottom: 15,
    },

    taskButtonDetail: {
        backgroundColor: "#0074D9",
        textAlign: "center",
        color: "#FFF",
        fontWeight: "bold",
        borderRadius: 2,
        paddingBottom: 3,
        paddingTop: 3,
    },

    header: {
        display: "flex",
        textAlign: "center",
        marginLeft: 30,
    },

    billContainer: {
        backgroundColor: "#0074D9",
        margin: 10,
        borderRadius: 8,
        padding: 10,
    },

    billtext: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#FFF",
    },

    buttoncontainer: {
        flexDirection: "row",
        marginLeft: 5,
    },
})