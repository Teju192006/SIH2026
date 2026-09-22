import numpy as np
import matplotlib.pyplot as plt


def simulate_eye(severity):
    """
    Basic 2D diabetic retinopathy simulator
    severity: 0 = Healthy
              1 = Mild
              2 = Moderate
              3 = Severe
    """

    fig, ax = plt.subplots(figsize=(7, 7))

    # -----------------------------
    # Create retina background
    # -----------------------------
    size = 500
    y, x = np.ogrid[:size, :size]

    center = size / 2
    radius = 220

    retina = ((x - center) ** 2 + (y - center) ** 2) <= radius ** 2

    background = np.zeros((size, size, 3))
    background[:, :, 0] = 0.65
    background[:, :, 1] = 0.15
    background[:, :, 2] = 0.12

    ax.imshow(background)

    # Mask outside retina
    ax.add_patch(
        plt.Circle(
            (center, center),
            radius,
            fill=False,
            edgecolor="black",
            linewidth=8
        )
    )

    # -----------------------------
    # Draw optic disc
    # -----------------------------
    ax.add_patch(
        plt.Circle(
            (370, 180),
            45,
            color="orange",
            alpha=0.8
        )
    )

    # -----------------------------
    # Draw basic blood vessels
    # -----------------------------
    vessel_lines = [
        [(250, 250), (180, 150), (100, 100)],
        [(250, 250), (150, 300), (80, 350)],
        [(250, 250), (170, 400), (120, 450)],
        [(250, 250), (330, 150), (390, 100)],
        [(250, 250), (350, 320), (440, 370)],
        [(250, 250), (320, 400), (400, 450)]
    ]

    for line in vessel_lines:
        xs = [p[0] for p in line]
        ys = [p[1] for p in line]

        ax.plot(
            xs,
            ys,
            color="darkred",
            linewidth=3 + severity * 0.7
        )

    # -----------------------------
    # Diabetic retinopathy lesions
    # -----------------------------
    np.random.seed(10)

    lesion_count = {
        0: 0,
        1: 15,
        2: 35,
        3: 65
    }

    count = lesion_count[severity]

    for i in range(count):

        # Random point inside retina
        angle = np.random.uniform(0, 2 * np.pi)
        r = np.random.uniform(40, 190)

        px = center + r * np.cos(angle)
        py = center + r * np.sin(angle)

        # Microaneurysm / bleeding spot
        ax.scatter(
            px,
            py,
            s=np.random.uniform(8, 25 + severity * 5),
            color="black",
            alpha=0.85
        )

    # -----------------------------
    # Severe stage: larger hemorrhages
    # -----------------------------
    if severity >= 2:

        for i in range(severity * 5):

            angle = np.random.uniform(0, 2 * np.pi)
            r = np.random.uniform(70, 190)

            px = center + r * np.cos(angle)
            py = center + r * np.sin(angle)

            ax.scatter(
                px,
                py,
                s=np.random.uniform(40, 100),
                color="darkred",
                alpha=0.7
            )

    # -----------------------------
    # Title
    # -----------------------------
    labels = {
        0: "Healthy Retina",
        1: "Mild Diabetic Retinopathy",
        2: "Moderate Diabetic Retinopathy",
        3: "Severe Diabetic Retinopathy"
    }

    ax.set_title(
        labels[severity],
        fontsize=18,
        fontweight="bold"
    )

    ax.axis("off")

    return fig


# -----------------------------
# Main — interactive CLI loop
# -----------------------------

def main():
    print("=" * 50)
    print("  2D Diabetic Retinopathy Eye Simulator")
    print("=" * 50)
    print("  Basic educational simulator showing how retinal")
    print("  lesions increase with DR severity.\n")

    while True:
        print("Select severity level:")
        print("  0 - Healthy Retina")
        print("  1 - Mild Diabetic Retinopathy")
        print("  2 - Moderate Diabetic Retinopathy")
        print("  3 - Severe Diabetic Retinopathy")
        print("  q - Quit")

        choice = input("\nEnter severity (0-3) or q to quit: ").strip().lower()

        if choice == "q":
            print("Exiting simulator.")
            break

        if choice not in ("0", "1", "2", "3"):
            print("Invalid input. Please enter 0, 1, 2, or 3.\n")
            continue

        severity = int(choice)
        fig = simulate_eye(severity)
        plt.show()
        plt.close(fig)
        print()


if __name__ == "__main__":
    main()
