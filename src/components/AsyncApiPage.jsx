import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from "react-router-dom";

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

function AsyncApiPage(props) {
    return (
        <div>AsyncApi Ui</div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AsyncApiPage);
