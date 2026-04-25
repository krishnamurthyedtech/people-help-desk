import React from 'react';
function Footer({ showForm = false }) {
    return (
        <>
            <footer className={showForm ? 'footer-below-form' : ''}>
                <div class="footer-bottom">
                    <div class="grid-row clear-fix">
                        <div class="copyright">People Help Desk. 2026. All Rights Reserved</div>
                    </div>
                </div>
            </footer>
        </>
    );

}
export default Footer;