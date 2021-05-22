import { css } from "@emotion/core";

export const thumbler = css`
  display: inline-block;
  height: 2em;
  border: 1px solid #fff;
  overflow: hidden;
  border-radius: 4px;
`;

export const wrapper = css`
    display: inline-block;
    position: relative;
    width: 3em;
    height: 100%;
`;

export const thumblerInput = css`
  position: absolute;
  top: auto;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE 6/7 */
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap; /* https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe */
      & + label {
         display: block;
        color: #fff;
        text-align: center;
        margin: 0;
        position: relative;
        z-index: 0;
        height: 100%;
        cursor: pointer;
    }
        & + label:before {
              content: '';
              display: block;
              width: 3em;
              vertical-align: top;
              cursor: pointer;
              text-align: center;
              transition: all .1s ease-out;
    }
     &:checked + label {
        color: black;
     }
    &:checked + label:before {
        color: black;
        line-height: .85;
        height: 100%;
        position: absolute;
        background: #fff;
        z-index: -1;
    }
`;
