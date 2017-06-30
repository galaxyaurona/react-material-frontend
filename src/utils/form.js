import React, { Component } from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import CircularProgress from 'material-ui/CircularProgress';
import LinearProgress from 'material-ui/LinearProgress';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import FontIcon from 'material-ui/FontIcon';
const renderMaterialInput = (field) => {
    // default params
    if (!field.className) { field.className = "" }
    if (!field.type) { field.type = "text" }
    if (!field.component) { field.component = {} }
    if (!field.hintText) { field.hintText = "Unspecified hint text" }
    if (!field.validate) { field.validate = [] }
    let fieldRefProps,fieldCustomProps = {}
    if (field.refProps) {
        fieldRefProps = { ...field.refProps }
        delete field.refProps
    }
    if (field.customProps) {
        fieldCustomProps = { ...field.customProps }
        delete field.customProps
    }
    // prevent unspecified html attribute 


    if (field.errorStyle)
        field.errorStyle.float = "left"
    else
        field.errorStyle = { float: "left" }

    return (
        <div key={field.name}>
            <Field



                {...field}

                {...fieldRefProps}
            />

            {fieldCustomProps.asyncValidating ? <LinearProgress style={{ top: -50 }}></LinearProgress> : ""}

            {fieldCustomProps.validatedWithIcon ? <FontIcon className="material-icons" style={{ top: -50, float: "right", marginBottom: -50 }} color="green">check</FontIcon> : ""}
        </div>





    )
}

export { renderMaterialInput }
