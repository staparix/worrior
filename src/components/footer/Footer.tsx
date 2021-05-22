/** @jsx jsx */
import * as React from "react";
import { jsx, css } from "@emotion/core";

type FooterProps = {
    onOrderButtonClick: () => void;
};

const order = css`
  text-align: center;
  padding: 10px;
`;

export class Footer extends React.PureComponent<FooterProps> {
    public render() {
        return (
            <div css={order }>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ this.props.onOrderButtonClick }
                >
                    Заказать
                </button>
            </div>
        );
    }
}
