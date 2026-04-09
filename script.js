// cypress/integration/tests/test.spec.js

describe('Cube Drag Arena', () => {

  beforeEach(() => {
    cy.visit('/');                          // adjust to your actual URL / route
    cy.get('#arena').should('exist');       // wait until arena is in the DOM
    cy.get('.cube').should('have.length', 9); // all 9 cubes rendered
  });

  /* ─────────────────────────────────────────────────
     1. Basic render
  ───────────────────────────────────────────────── */
  it('renders 9 labelled cubes', () => {
    const labels = ['A','B','C','D','E','F','G','H','I'];
    labels.forEach((label, i) => {
      cy.get('.cube').eq(i).should('have.text', label);
    });
  });

  /* ─────────────────────────────────────────────────
     2. Click without drag → hint message
  ───────────────────────────────────────────────── */
  it('shows a hint message on click without drag', () => {
    cy.get('.cube').first()
      .trigger('mousedown', { which: 1, clientX: 100, clientY: 100 })
      .trigger('mouseup',   { force: true });

    cy.get('#hint').should('contain', 'clicked');
  });

  /* ─────────────────────────────────────────────────
     3. Drag moves the cube (left position changes)
  ───────────────────────────────────────────────── */
  it('moves a cube when dragged', () => {
    // Record starting left before drag
    cy.get('.cube').first().then($cube => {
      const startLeft = parseFloat($cube[0].style.left);

      cy.get('.cube').first()
        .trigger('mousedown', { which: 1, clientX: 150, clientY: 150 })
        .trigger('mousemove', { clientX: 300, clientY: 150, force: true })
        .trigger('mouseup',   { force: true });

      cy.get('.cube').first().should($moved => {
        const newLeft = parseFloat($moved[0].style.left);
        expect(newLeft).to.be.greaterThan(startLeft);
      });
    });
  });

  /* ─────────────────────────────────────────────────
     4. Drag shows "dropped at" hint with coordinates
  ───────────────────────────────────────────────── */
  it('updates hint with drop coordinates after drag', () => {
    cy.get('.cube').first()
      .trigger('mousedown', { which: 1, clientX: 100, clientY: 100 })
      .trigger('mousemove', { clientX: 250, clientY: 200, force: true })
      .trigger('mouseup',   { force: true });

    cy.get('#hint').should('contain', 'dropped at');
    cy.get('#hint').should('match', /dropped at \(\d+, \d+\)/);
  });

  /* ─────────────────────────────────────────────────
     5. Cube stays within arena bounds after drag
  ───────────────────────────────────────────────── */
  it('clamps cube inside arena boundaries', () => {
    cy.get('#arena').then($arena => {
      const arenaW = $arena[0].offsetWidth;
      const arenaH = $arena[0].offsetHeight;

      // Try to drag way outside the arena to the right/bottom
      cy.get('.cube').first()
        .trigger('mousedown', { which: 1, clientX: 50, clientY: 50 })
        .trigger('mousemove', { clientX: 9999, clientY: 9999, force: true })
        .trigger('mouseup',   { force: true });

      cy.get('.cube').first().should($cube => {
        const left = parseFloat($cube[0].style.left);
        const top  = parseFloat($cube[0].style.top);
        expect(left).to.be.at.most(arenaW  - 64); // CUBE_SIZE = 64
        expect(top ).to.be.at.most(arenaH  - 64);
        expect(left).to.be.at.least(0);
        expect(top ).to.be.at.least(0);
      });
    });
  });

  /* ─────────────────────────────────────────────────
     6. Multiple cubes can be dragged independently
  ───────────────────────────────────────────────── */
  it('moves each cube independently', () => {
    // Drag cube A (index 0)
    cy.get('.cube').eq(0)
      .trigger('mousedown', { which: 1, clientX: 100, clientY: 100 })
      .trigger('mousemove', { clientX: 300, clientY: 100, force: true })
      .trigger('mouseup',   { force: true });

    // Drag cube B (index 1)
    cy.get('.cube').eq(1)
      .trigger('mousedown', { which: 1, clientX: 200, clientY: 100 })
      .trigger('mousemove', { clientX: 200, clientY: 300, force: true })
      .trigger('mouseup',   { force: true });

    // Cube A moved right, cube B moved down — positions differ
    cy.get('.cube').eq(0).then($a => {
      cy.get('.cube').eq(1).then($b => {
        const leftA = parseFloat($a[0].style.left);
        const topB  = parseFloat($b[0].style.top);
        expect(leftA).to.be.greaterThan(100);
        expect(topB ).to.be.greaterThan(100);
      });
    });
  });

  /* ─────────────────────────────────────────────────
     7. dragging class is added/removed correctly
  ───────────────────────────────────────────────── */
  it('adds dragging class on mousedown and removes on mouseup', () => {
    cy.get('.cube').first()
      .trigger('mousedown', { which: 1, clientX: 100, clientY: 100 })
      .should('have.class', 'dragging');

    cy.get('.cube').first()
      .trigger('mouseup', { force: true })
      .should('not.have.class', 'dragging');
  });

});