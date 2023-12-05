import React from 'react';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

const Wrapper = styled.div`
  transition: all 0.15s ease-in-out;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 1;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  left: 0;
  top: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  position: relative;
  border: 1px solid #d7dae0;
  border-radius: 25px;
  overflow: hidden;
  background-color: #fafafa;
  color: #202832;
  @media screen and (min-width: 30em) {
    margin-right: auto;
    margin-left: auto;
    max-width: 32rem;
  }
`;

const ModalContent = styled.div`
  border-top: 1px solid #d7dae0;
  border-bottom: 1px solid #d7dae0;
  font-size: 0.875rem;
  text-align: center;
  padding: 2rem;
  font-weight: 100;
`;

const ModalActions = styled.div`
  display: flex;
  flex-direction: row;
`;

const BaseButton = styled.button`
  border-radius: 0;
  border-style: none;
  border-width: 0;
  background-color: transparent;
  color: #2c3644;
  font-size: 0.875rem;
  text-transform: uppercase;
  padding: 1rem;
  width: 100%;
  font-weight: 400;
  text-align: center;
  display: block;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;

const CancelButton = styled(BaseButton)`
  border-right: 1px solid #d7dae0;
`;

const SubmitButton = styled(BaseButton)`
  font-weight: 900;
  color: ${(props) => (props.disabled ? '#d7dae0' : '#db8403')};
  opacity: ${(props) => (props.disabled ? '0.7' : '1')};
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 700;
  line-height: 1.5;
  color: #2c3644;
  font-size: 21px;
  margin-bottom: 10px;
`;

const BankSlipsOpenedModalComponent = ({
  onSubmit,
  onClose,
  isSubmitting = false,
  intl,
  ...props
}) => {
  const translate = (id) => intl.formatMessage({ id });

  const fadeInStates = {
    entering: 'o-0',
    entered: 'o-100',
    exiting: 'o-100',
    exited: 'o-0',
  };

  const growStates = {
    entering: 0.2,
    entered: 1,
    exiting: 1,
    exited: 0,
  };

  return (
    <Transition timeout={50} appear in>
      {(state) => (
        <Wrapper
          data-testid={props['data-testid']}
          className={`${fadeInStates[state]}`}
        >
          <Modal style={{ transform: `scale(${growStates[state]})` }}>
            <ModalContent>
              <Title>{translate('bankSlipsOpenedModal.title')}</Title>
            </ModalContent>
            <ModalActions>
              <CancelButton
                data-testid={`${props['data-testid']}.cancelButton`}
                type="button"
                onClick={onClose}
              >
                {translate('cancel')}
              </CancelButton>
              <SubmitButton
                onSubmit={onSubmit}
                data-testid={`${props['data-testid']}.submitButton`}
                type="button"
              >
                {translate(
                  isSubmitting ? 'submitting' : 'confirmationModal.conclude',
                )}
              </SubmitButton>
            </ModalActions>
          </Modal>
        </Wrapper>
      )}
    </Transition>
  );
};

const mapStateToProps = ({ intl }, props) => ({
  intl,
  ...props,
});

export const BankSlipsOpenedModal = connect(mapStateToProps)(
  injectIntl(BankSlipsOpenedModalComponent),
);
