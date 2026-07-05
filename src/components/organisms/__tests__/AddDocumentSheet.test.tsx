import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { AddDocumentSheet } from '../AddDocumentSheet';

jest.mock('expo-document-picker', () => ({
  getDocumentAsync: jest.fn().mockResolvedValue({
    canceled: false,
    assets: [{ name: 'spec.pdf' }],
  }),
}));

describe('AddDocumentSheet', () => {
  it('keeps submit disabled until name and version are filled', async () => {
    await render(
      <AddDocumentSheet visible onClose={jest.fn()} onSubmit={jest.fn()} />,
    );

    const submit = screen.getByTestId('submit-document');
    expect(submit.props.accessibilityState.disabled).toBe(true);

    const [nameInput] = screen.getAllByPlaceholderText('Placeholder');
    await fireEvent.changeText(nameInput, 'My Doc');
    // Version still empty → still disabled.
    expect(submit.props.accessibilityState.disabled).toBe(true);
  });

  it('submits the entered values', async () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    await render(
      <AddDocumentSheet visible onClose={jest.fn()} onSubmit={onSubmit} />,
    );

    const [nameInput, versionInput] = screen.getAllByPlaceholderText('Placeholder');
    await fireEvent.changeText(nameInput, 'My Doc');
    await fireEvent.changeText(versionInput, '1.2.3');
    await fireEvent.press(screen.getByTestId('submit-document'));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        title: 'My Doc',
        version: '1.2.3',
        attachment: null,
      }),
    );
  });
});
