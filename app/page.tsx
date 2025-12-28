export default function HomePage() {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 0",
          backgroundColor: "#f0f2f5",
        }}
      >
        <h2 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
          Find Your Perfect Stay
        </h2>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            padding: "2rem",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div style={{ flex: 1 }}>
            <label
              htmlFor="checkin-date"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Check-in Date
            </label>
            <input
              type="date"
              id="checkin-date"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="checkout-date"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Check-out Date
            </label>
            <input
              type="date"
              id="checkout-date"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              htmlFor="guests"
              style={{ display: "block", marginBottom: "0.5rem" }}
            >
              Guests
            </label>
            <input
              type="number"
              id="guests"
              min="1"
              defaultValue="1"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#ff6f61",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            Search
          </button>
        </form>
      </div>
    );
  }