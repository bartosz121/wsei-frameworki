import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useUserStore } from "../../state/user.state";
import UserInfo from "./UserInfo";

const testData = {
  id: 2,
  name: "John Doe",
  username: "johndoe",
  email: "johndoe@example.com",
  phone: "123-456-7890",
  website: "johndoe.com",
  address: {
    street: "123 Main St",
    suite: "Apt 1",
    city: "New York",
    zipcode: "12345",
    geo: {
      lat: "40.7128",
      lng: "-74.0060",
    },
  },
  company: {
    name: "ABC Company",
    catchPhrase: "Catchy phrase",
    bs: "Business stuff",
  },
};

describe("UserInfo", () => {
  beforeEach(() => {
    useUserStore.setState({
      userId: 1,
      isLoggedIn: true,
      userData: {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    });
  });

  it("renders user information", () => {
    const { getByText } = render(
      <MemoryRouter>
        <UserInfo data={testData} />
      </MemoryRouter>
    );

    expect(getByText(testData.name)).toBeInTheDocument();
    expect(getByText(testData.username)).toBeInTheDocument();
    expect(getByText(testData.email)).toBeInTheDocument();
    expect(getByText(testData.phone)).toBeInTheDocument();
    expect(getByText(testData.website)).toBeInTheDocument();
    expect(getByText(testData.address.street)).toBeInTheDocument();
    expect(getByText(testData.address.suite)).toBeInTheDocument();
    expect(getByText(testData.address.city)).toBeInTheDocument();
    expect(getByText(testData.address.zipcode)).toBeInTheDocument();
    expect(getByText(testData.address.geo.lat)).toBeInTheDocument();
    expect(getByText(testData.address.geo.lng)).toBeInTheDocument();
    expect(getByText(testData.company.name)).toBeInTheDocument();
    expect(getByText(testData.company.catchPhrase)).toBeInTheDocument();
    expect(getByText(testData.company.bs)).toBeInTheDocument();
  });
});
